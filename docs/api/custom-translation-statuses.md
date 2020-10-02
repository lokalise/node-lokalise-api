# Custom translation statuses

[Translation Status attributes](https://app.lokalise.com/api2docs/curl/#object-translation-statuses)

*Custom translation statuses must be enabled for the project before using this endpoint!* It can be done in the project settings.

## Fetch translation statuses

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-statuses-get)

```js
lokaliseApi.translationStatuses.list({project_id: project_id});
```

## Fetch a single translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-status-get)

```js
lokaliseApi.translationStatuses.get(status_id, {project_id: project_id});
```

## Create translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-status-post)

```js
lokaliseApi.translationStatuses.create(
    {title: 'my status', color: '#344563'},
    {project_id: project_id}
 );
```

## Update translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-status-put)

```js
lokaliseApi.translationStatuses.update(
    status_id,
    {title: 'my status updated', color: '#f2d600'},
    {project_id: project_id}
 );
```

## Delete translation status

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-status-delete)

```js
lokaliseApi.translationStatuses.delete(status_id, {project_id: project_id});
```

## Supported color codes for translation statuses

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-available-colors-get)

As long as Lokalise supports only very limited array of color hexadecimal codes for custom translation statuses, this method can be used to fetch all permitted values.

```js
lokaliseApi.translationStatuses.available_colors({project_id: project_id});
```
