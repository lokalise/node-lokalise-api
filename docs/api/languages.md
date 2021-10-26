# Languages

[Language attributes](https://app.lokalise.com/api2docs/curl/#object-languages)

## Fetch system languages

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-system-languages-get)

```js
const languages = await lokaliseApi.languages().system_languages({
  page: 3,
  limit: 2,
});

languages.items[0].lang_id;
```

## Fetch project languages

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-languages-get)

```js
const languages = await lokaliseApi.languages().list({
  project_id: project_id,
  page: 2,
  limit: 4,
});

languages.items[0].lang_id;
```

## Fetch a single project language

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-language-get)

```js
const language = await lokaliseApi.languages().get(lang_id, {
  project_id: project_id,
});

language.lang_name;
```

## Create project languages

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-languages-post)

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

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-language-put)

```js
const language = await lokaliseApi.languages().update(lang_id, {
  "lang_name": "Chinese Traditional Custom"
}, { project_id: project_id });

language.lang_name;
```

## Delete project language

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-language-delete)

```js
const response = await lokaliseApi.languages().delete(lang_id, { project_id: project_id });

response.language_deleted;
```
