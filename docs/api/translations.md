# Translations

[Translation attributes](https://app.lokalise.com/api2docs/curl/#resource-translations)

## Fetch translations

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-translations-get)

```js
lokaliseApi.translations.list({project_id: project_id});
```

## Fetch a single translation

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-translation-get)

```js
lokaliseApi.translations.get(translation_id, {project_id: project_id});
```

## Update translation

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-translation-put)

```js
lokaliseApi.translations.update(
  translation_id,
  {translation: 'updated'},
  {project_id: project_id}
);
```
