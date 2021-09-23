# Translation files

[File attributes](https://app.lokalise.com/api2docs/curl/#object-files)

## Fetch translation files

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-files-get)

```js
const files = await lokaliseApi.files().list({
  project_id: project_id,
  page: 3,
  limit: 4
});

files.items[0].filename;
```

## Download translation files

[API doc](https://app.lokalise.com/api2docs/curl/#transition-download-files-post)

Exports project files as a `.zip` bundle and makes them available to download (the link is valid for 12 months).

```js
const response = await lokaliseApi.files().download(project_id,
  {format: 'json', "original_filenames": true}
);

response.bundle_url;
```

## Upload translation file

[API doc](https://app.lokalise.com/api2docs/curl/#transition-upload-a-file-post)

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
process = await lokaliseApi.queuedProcesses.get(process.process_id, { project_id: project_id })

process.status // => 'finished'
```
