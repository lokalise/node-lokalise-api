---
---
# Screenshots

[Screenshot attributes](https://developers.lokalise.com/reference/screenshot-object)

## Fetch screenshots

[API doc](https://developers.lokalise.com/reference/list-all-screenshots)

```js
const screenshots = await lokaliseApi.screenshots().list({
  project_id: project_id,
  page: 1,
  limit: 1,
});

screenshots.items[0].screenshot_id;
```

## Fetch a single screenshot

[API doc](https://developers.lokalise.com/reference/retrieve-a-screenshot)

```js
const screenshot = await lokaliseApi.screenshots().get(screenshot_id, {project_id: project_id});

screenshot.title;
```

## Create screenshots

[API doc](https://developers.lokalise.com/reference/create-screenshots)

```js
const screenshots = await lokaliseApi.screenshots().create(
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

[API doc](https://developers.lokalise.com/reference/update-a-screenshot)

```js
const screenshot = await lokaliseApi.screenshots().update(screenshot_id,
  {title: 'node screen', description: 'node desc'},
  {project_id: project_id}
);

screenshot.title;
```

## Delete screenshot

[API doc](https://developers.lokalise.com/reference/delete-a-screenshot)

```js
const response = await lokaliseApi.screenshots().delete(screenshot_id, {project_id: project_id});

response.screenshot_deleted
```
