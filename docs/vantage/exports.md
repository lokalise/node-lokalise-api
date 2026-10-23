---
---
# Exports

## List exports

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-exports)

```js
const result = await lokaliseVantageApi.exports().list({
  project_id,
  limit: 10,
});

result.items[0].status; // "COMPLETED"
```

## Fetch an export

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-exports-exportid)

```js
const result = await lokaliseVantageApi.exports().get({
  project_id,
  export_id,
});

result.status; // "COMPLETED"
esult.totalItemsCount; // 2
```

## Create export

[API doc](https://developers.lokalise.com/reference/post_v1-projects-projectid-exports)

```js
const result = await lokaliseVantageApi.exports().create(
  { project_id },
  { locales: ["fr"] },
);

result.exportId; // "01a14ff9-0232-48da-7ab0-2144dc32fd5d"
result.status; // "IN_PROGRESS"
```

## Get export download URL

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-exports-exportid-download-url)

```js
const result = await lokaliseVantageApi.exports().getDownloadUrl({
  project_id,
  export_id,
});

result.downloadUrl; // "https://example.com/bundle"
```