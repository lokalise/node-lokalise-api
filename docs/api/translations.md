---
---
# Translations

## Fetch translations

[API doc](https://developers.lokalise.com/reference/list-all-translations)

**This endpoint also supports cursor pagination which is now a recommended approach, especially for fetching large amounts of data. Please [learn more in the Pagination docs]({{ 'api/getting-started#cursor-pagination' | relative_url }}).**

```js
const translations = lokaliseApi.translations().list({
  project_id: project_id,
  filter_is_reviewed: 0,
  filter_lang_id: 803,
  page: 2,
  limit: 1
});

translations.items[0].translation_id;
```

Please note that if you would like to filter translations by their language, you have to provide *language ID*, not language ISO code, as it is shown in the example above!

## Fetch a single translation

[API doc](https://developers.lokalise.com/reference/retrieve-a-translation)

```js
const translation = await lokaliseApi.translations().get(translation_id, {project_id: project_id});

translation.key_id;
```

## Update translation

[API doc](https://developers.lokalise.com/reference/update-a-translation)

```js
const translation = await lokaliseApi.translations().update(
  translation_id,
  {translation: 'updated'},
  {project_id: project_id}
);

translation.translation_id;
```
