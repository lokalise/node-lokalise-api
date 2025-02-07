# Translation files

[File attributes](https://developers.lokalise.com/reference/file-object)

## Fetch translation files

[API doc](https://developers.lokalise.com/reference/list-all-files)

```js
const files = await lokaliseApi.files().list({
  project_id: project_id,
  page: 3,
  limit: 4
});

files.items[0].filename;
```

## Download translation files

[API doc](https://developers.lokalise.com/reference/download-files)

Exports project files as a `.zip` bundle and makes them available to download (the link is valid for 12 months).

```js
const response = await lokaliseApi.files().download(project_id,
  {format: 'json', "original_filenames": true}
);

response.bundle_url;
```

## Download translation files (async)

[API doc](https://developers.lokalise.com/reference/download-files-async)

Starts a project export process.

```js
const projectId = "123.abc";
const process = await lokaliseApi.files().async_download(projectId,
  {format: 'json', "original_filenames": true}
);

const process_id = process.process_id;
```

Once complete, the download URL can be accessed using the [Retrieve process API endpoint](https://developers.lokalise.com/reference/retrieve-a-process):

```js
const processInfo = await lokaliseApi
  .queuedProcesses()
  .get(process_id, { project_id: projectId });

processInfo.type; // => "async-export"
processInfo.status; // => "finished"
processInfo.details.total_number_of_keys; // => 14
processInfo.details.download_url // => "https://lokalise-live-lok-s3-fss-export.s3.eu-central-1.amazonaws.com/..."
```

## Upload translation file

[API doc](https://developers.lokalise.com/reference/upload-a-file)

**Background uploading is the only method of importing files since July 2020.**

```js
process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'}
);
process.status; // => 'queued'
```

Asynchronous upload will return a [`QueuedProcess`](#queued-processes) containing process ID, status of the process (`queued`, `finished`, `failed` etc) and some other info. You may periodically check the status of the process by using `get()` method:

```js
process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'}
);

// You'll obtain `process_id` after calling `files.upload()`
process = await lokaliseApi.queuedProcesses().get(process.process_id, { project_id: project_id })

process.status // => 'finished'
```

## Delete translation file

[API doc](https://developers.lokalise.com/reference/delete-a-file)

Please note that this endpoint does not support "software localization" projects.

```js
const response = await lokaliseApi.files().delete(file_id,
  { project_id: project_id }
);

response.project_id // => "123.abc"
response.file_deleted // => true
```