# Contributors

## Fetch contributors

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-contributors-get)

```js
lokaliseApi.contributors.list({project_id: project_id});
```

## Fetch a single contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-contributor-get)

```js
lokaliseApi.contributors.get(user_id, {project_id: project_id});
```

## Create contributors

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-contributors-post)

```js
lokaliseApi.contributors.create([
  {
    "email": "translator2@mycompany.com",
    "fullname": "Mr. Translator",
    "is_admin": false,
    "is_reviewer": true,
    "languages": [
      {
        "lang_iso": "en",
        "is_writable": false
      }
    ]
  }
], {project_id: project_id});
```

## Update contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-contributor-put)

```js
lokaliseApi.contributors.update(
  user_id,
  {is_admin: true},
  {project_id: project_id}
);
```

## Delete contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-contributor-delete)

```js
lokaliseApi.contributors.delete(user_id, {project_id: project_id});
```
