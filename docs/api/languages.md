# Languages

[Language attributes](https://app.lokalise.com/api2docs/curl/#object-languages)

## Fetch system languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-system-languages-get)

```js
lokaliseApi.languages.system_languages();
```

## Fetch project languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-languages-get)

```js
lokaliseApi.languages.list({project_id: project_id});
```

## Fetch a single project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-language-get)

```js
lokaliseApi.languages.get(lang_id, {project_id: project_id});
```

## Create project languages

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-languages-post)

```js
lokaliseApi.languages.create([
  {
    "lang_iso": "ak"
  }
], { project_id: project_id });
```

## Update project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-language-put)

```js
lokaliseApi.languages.update(lang_id, {
  "lang_name": "Chinese Traditional Custom"
}, { project_id: project_id });
```

## Delete project language

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-language-delete)

```js
lokaliseApi.languages.delete(lang_id, { project_id: project_id });
```
