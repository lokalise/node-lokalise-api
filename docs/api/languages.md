---
---
# Languages

[Language attributes](https://developers.lokalise.com/reference/language-object)

## Fetch system languages

[API doc](https://developers.lokalise.com/reference/list-system-languages)

```js
const languages = await lokaliseApi.languages().system_languages({
  page: 3,
  limit: 2,
});

languages.items[0].lang_id;
```

## Fetch project languages

[API doc](https://developers.lokalise.com/reference/list-project-languages)

```js
const languages = await lokaliseApi.languages().list({
  project_id: project_id,
  page: 2,
  limit: 4,
});

languages.items[0].lang_id;
```

## Fetch a single project language

[API doc](https://developers.lokalise.com/reference/retrieve-a-language)

```js
const language = await lokaliseApi.languages().get(lang_id, {
  project_id: project_id,
});

language.lang_name;
```

## Create project languages

[API doc](https://developers.lokalise.com/reference/create-languages)

```js
const languages = await lokaliseApi.languages().create([
  {
    "lang_iso": "ak"
  }
], { project_id: project_id });

languages.items[0].lang_id;
languages.errors;
```

## Update project language

[API doc](https://developers.lokalise.com/reference/update-a-language)

```js
const language = await lokaliseApi.languages().update(lang_id, {
  "lang_name": "Chinese Traditional Custom"
}, { project_id: project_id });

language.lang_name;
```

## Delete project language

[API doc](https://developers.lokalise.com/reference/delete-a-language)

```js
const response = await lokaliseApi.languages().delete(lang_id, { project_id: project_id });

response.language_deleted;
```
