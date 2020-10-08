# Translations

[Translation attributes](https://app.lokalise.com/api2docs/curl/#resource-translations)

## Fetch translations

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-translations-get)

```js
lokaliseApi.translations.list({
  project_id: project_id,
  filter_is_reviewed: 0,
  filter_lang_id: 803
});
```

Please note that is you would like to filter translations by their language, you have to provide *language ID*, not language ISO code, as it is shown in the example above!

## Fetch a single translation

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-translation-get)

```js
lokaliseApi.translations.get(translation_id, {project_id: project_id});
```

## Update translation

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-translation-put)

```js
lokaliseApi.translations.update(
  translation_id,
  {translation: 'updated'},
  {project_id: project_id}
);
```
