---
---

# Uploads

## Stage uploads

[API doc](https://developers.lokalise.com/reference/post_v1-projects-projectid-uploads)

Register files for upload and receive pre-signed URLs and form fields for uploading their contents to Amazon S3. This step does not import the files into your project.

Provide each file's name, MIME type, size in bytes, and MD5 checksum in hexadecimal format.

```js
const result = await lokaliseVantageApi.uploads().create(
  { project_id },
  {
    uploads: [
      {
        fileName: "example.md",
        mimeType: "text/markdown",
        size: 1024,
        checksum: "e893e99354a665b25c6c97eb059c716a",
      },
    ],
  },
);

result.batchId; // UUID of the upload batch
result.uploads[0].uploadId; // UUID of the staged upload
result.uploads[0].upload.url; // Pre-signed S3 URL
result.uploads[0].upload.fields; // Required form fields
result.uploads[0].upload.expiresAt; // URL expiration time
```

Individual files may be rejected during staging. Check each entry for an `error` property before using its upload target.

## List uploads

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-uploads)

Retrieve uploads and their current statuses. You can also filter uploads by batch ID or upload IDs.

```js
const result = await lokaliseVantageApi.uploads().list({
  project_id,
  limit: 10,
});

result.items[0].status; // "IMPORTED"
```

## Complete uploads

[API doc](https://developers.lokalise.com/reference/post_v1-projects-projectid-uploads-actions-complete)

After sending the file contents to the provided S3 URLs, notify Lokalise that the uploads are complete. This starts asynchronous processing of the files.

You can complete an entire batch or specify individual upload IDs.

```js
await lokaliseVantageApi.uploads().complete(
  { project_id },
  { batchId },
);
```

The method returns `void`. Use `uploads().list()` to check when the files reach the `UPLOADED` status or whether processing failed.

## Import uploads

[API doc](https://developers.lokalise.com/reference/post_v1-projects-projectid-imports)

Import uploaded files into the project as source content. You can import an entire batch or select individual uploads from the same batch.

```js
const result = await lokaliseVantageApi.imports().create(
  { project_id },
  { batchId },
);

result.importId; // UUID of the import
```

To import selected files instead, pass an array of upload IDs:

```js
const result = await lokaliseVantageApi.imports().create(
  { project_id },
  {
    uploads: [
      { uploadId: "upload-uuid-1" },
      { uploadId: "upload-uuid-2" },
    ],
  },
);
```

Importing runs asynchronously. Once completed, the uploaded files become project items and translation starts automatically according to the project settings.

## Get import translation status

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-translation-statuses-importid)

Check translation progress for an import, including the status of each target language.

```js
const result = await lokaliseVantageApi
  .translationStatuses()
  .get({ project_id, import_id });

result.status; // "PENDING_REVIEW"
result.languages[0].locale; // "fr"
result.languages[0].status; // "PENDING_REVIEW"
```

A `COMPLETED` status indicates that the content is ready for export, including any required human review.

## Complete file upload example

The following example demonstrates the full upload and import process using a Markdown file. The workflow consists of staging a file through the Vantage API, uploading its contents directly to Amazon S3, confirming the upload, and importing the file into the project.

**Please note:** Uploading file contents to S3 is not handled by the SDK. Use a standard HTTP client such as `fetch()` with `FormData` and the pre-signed upload target returned by the API.

```js
import { createHash } from "node:crypto";
import { LokaliseApiVantage } from "@lokalise/node-api";

const lokaliseVantageApi = new LokaliseApiVantage({
  apiKey: process.env.LOKALISE_API_KEY,
});

const project_id = "your-project-uuid";

const file = {
  fileName: "example.md",
  mimeType: "text/markdown",
  content: Buffer.from(
    "# Hello world\n\nThis is an example document.\n",
    "utf8",
  ),
};

// Step 1: Stage the file and obtain a pre-signed S3 upload target.
const staged = await lokaliseVantageApi.uploads().create(
  { project_id },
  {
    uploads: [
      {
        fileName: file.fileName,
        mimeType: file.mimeType,
        size: file.content.byteLength,
        checksum: createHash("md5")
          .update(file.content)
          .digest("hex"),
      },
    ],
  },
);

const upload = staged.uploads[0];

if (!upload || upload.error) {
  throw new Error(
    upload?.error?.message ?? "Failed to stage the file",
  );
}

// Step 2: Send the file directly to Amazon S3.
// Include all pre-signed fields without modifying their values.
const form = new FormData();

for (const [key, value] of Object.entries(upload.upload.fields)) {
  form.append(key, value);
}

// S3 also requires Content-Type as a separate form field.
if (!Object.hasOwn(upload.upload.fields, "Content-Type")) {
  form.append("Content-Type", file.mimeType);
}

// Append the file last.
form.append(
  "file",
  new Blob([Uint8Array.from(file.content)], {
    type: file.mimeType,
  }),
  file.fileName,
);

const response = await fetch(upload.upload.url, {
  method: "POST",
  body: form,
});

if (!response.ok) {
  throw new Error(
    `S3 upload failed: ${response.status} ${await response.text()}`,
  );
}

// Step 3: Notify Lokalise that the file has been uploaded.
await lokaliseVantageApi.uploads().complete(
  { project_id },
  { batchId: staged.batchId },
);

// Step 4: Wait for the uploaded file to be processed.
let ready = false;

for (let attempt = 0; attempt < 60; attempt++) {
  const result = await lokaliseVantageApi.uploads().list({
    project_id,
    "filter-batch-id": staged.batchId,
  });

  const current = result.items.find(
    (item) => item.uploadId === upload.uploadId,
  );

  if (current?.status === "UPLOAD_FAILED") {
    throw new Error(
      current.error?.message ?? "Upload processing failed",
    );
  }

  if (current?.status === "UPLOADED") {
    ready = true;
    break;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
}

if (!ready) {
  throw new Error("Timed out waiting for upload processing");
}

// Step 5: Import the file into the project.
const imported = await lokaliseVantageApi.imports().create(
  { project_id },
  { batchId: staged.batchId },
);

console.log("Import ID:", imported.importId);

// Step 6: Check translation progress for the imported content.
const status = await lokaliseVantageApi
  .translationStatuses()
  .get({
    project_id,
    import_id: imported.importId,
  });

console.log("Translation status:", status.status);
console.log("Languages:", status.languages);
```

**Notes:**

- Pre-signed S3 upload targets expire. Start uploading before the returned `expiresAt` value.
- The file content must match the MD5 checksum provided during staging.
- Do not manually set the HTTP `Content-Type` header for the multipart request. `fetch()` generates it automatically with the required boundary.
- Completing an upload and importing it are separate asynchronous operations. Check upload statuses before starting an import.
- The final translation status request returns the current state. It does not wait for translation or review to finish. Poll the endpoint if you need to wait for `COMPLETED`.