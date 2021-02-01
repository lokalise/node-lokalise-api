# Screenshots

[Screenshot attributes](https://app.lokalise.com/api2docs/curl/#resource-screenshots)

## Fetch screenshots

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-screenshots-get)

```js
const screenshots = await lokaliseApi.screenshots.list({
  project_id: project_id,
  page: 1,
  limit: 1,
});

screenshots.items[0].screenshot_id;
```

## Fetch a single screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-screenshot-get)

```js
const screenshot = await lokaliseApi.screenshots.get(screenshot_id, {project_id: project_id});

screenshot.title;
```

## Create screenshots

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-screenshots-post)

```js
const screenshots = await lokaliseApi.screenshots.create(
  [{
    "data": data_base64,
    "ocr": false,
    "key_ids": [key_id],
    "tags": ["onboarding"]
  }],
  {project_id: project_id}
);

screenshots.items[0].screenshot_id;
screenshots.errors;
```

## Update screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-screenshot-put)

```js
const screenshot = await lokaliseApi.screenshots.update(screenshot_id,
  {title: 'node screen', description: 'node desc'},
  {project_id: project_id}
);

screenshot.title;
```

## Delete screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-screenshot-delete)

```js
const response = await lokaliseApi.screenshots.delete(screenshot_id, {project_id: project_id});

response.screenshot_deleted
```
