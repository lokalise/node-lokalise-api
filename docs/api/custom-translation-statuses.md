# Custom translation statuses

[Translation Status attributes](https://app.lokalise.com/api2docs/curl/#object-translation-statuses)

*Custom translation statuses must be enabled for the project before using this endpoint!* It can be done in the project settings.

## Fetch translation statuses

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-custom-translation-statuses-get)

```js
lokaliseApi.translationStatuses.list({project_id: project_id});
```

## Fetch a single translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-custom-translation-status-get)

```js
lokaliseApi.translationStatuses.get(status_id, {project_id: project_id});
```

## Create translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-custom-translation-status-post)

```js
lokaliseApi.translationStatuses.create(
    {title: 'my status', color: '#344563'},
    {project_id: project_id}
 );
```

## Update translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-custom-translation-status-put)

```js
lokaliseApi.translationStatuses.update(
    status_id,
    {title: 'my status updated', color: '#f2d600'},
    {project_id: project_id}
 );
```

## Delete translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-custom-translation-status-delete)

```js
lokaliseApi.translationStatuses.delete(status_id, {project_id: project_id});
```

## Supported color codes for translation statuses

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-available-colors-for-custom-translation-statuses-get)

As long as Lokalise supports only very limited array of color hexadecimal codes for custom translation statuses, this method can be used to fetch all permitted values.

```js
lokaliseApi.translationStatuses.available_colors({project_id: project_id});
```
