# Custom translation statuses

[Translation Status attributes](https://app.lokalise.com/api2docs/curl/#object-translation-statuses)

*Custom translation statuses must be enabled for the project before using this endpoint!* It can be done in the project settings.

## Fetch translation statuses

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-statuses-get)

```js
const statuses = await lokaliseApi.translationStatuses.list({
  project_id: project_id,
  page: 2,
  limit: 3
});

statuses.items[0].title;
```

## Fetch a single translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-status-get)

```js
const status = await lokaliseApi.translationStatuses.get(status_id, {project_id: project_id});

status.title;
```

## Create translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-status-post)

```js
const status = await lokaliseApi.translationStatuses.create(
  {title: 'my status', color: '#344563'},
  {project_id: project_id}
);

status.title;
```

## Update translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-status-put)

```js
const status = await lokaliseApi.translationStatuses.update(
  status_id,
  {title: 'my status updated', color: '#f2d600'},
  {project_id: project_id}
);

status.title;
```

## Delete translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-status-delete)

```js
const response = await lokaliseApi.translationStatuses.delete(status_id, {project_id: project_id});

response.custom_translation_status_deleted;
```

## Supported color codes for translation statuses

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-available-colors-get)

As long as Lokalise supports only very limited array of color hexadecimal codes for custom translation statuses, this method can be used to fetch all permitted values.

```js
const colors_data = await lokaliseApi.translationStatuses.available_colors(
  {
    project_id: project_id,
  }
);

colors_data.colors;
```
