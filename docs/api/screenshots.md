# Screenshots

[Screenshot attributes](https://app.lokalise.com/api2docs/curl/#resource-screenshots)

## Fetch screenshots

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-screenshots-get)

```js
lokaliseApi.screenshots.list({project_id: project_id});
```

## Fetch a single screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-screenshot-get)

```js
lokaliseApi.screenshots.get(screenshot_id, {project_id: project_id});
```

## Create screenshots

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-screenshots-post)

```js
lokaliseApi.screenshots.create([
  {
    data: data,
    "ocr": false,
    "key_ids": [key_id],
    "tags": ["onboarding"]
  }
],{project_id: project_id});
```

## Update screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-screenshot-put)

```js
lokaliseApi.screenshots.update(screenshot_id,
  {title: 'node screen', description: 'node desc'},
  {project_id: project_id}
);
```

## Delete screenshot

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-screenshot-delete)

```js
lokaliseApi.screenshots.delete(screenshot_id, {project_id: project_id});
```
