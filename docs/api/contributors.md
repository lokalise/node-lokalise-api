# Contributors

## Fetch contributors

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-contributors-get)

```js
const contributors = await lokaliseApi.contributors().list({
  project_id: project_id,
  page: 2,
  limit: 3
});

contributors.items[0].user_id;
```

## Fetch a single contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-contributor-get)

```js
const contributor = await lokaliseApi.contributors().get(user_id, {project_id: project_id});

contributor.email;
```

## Create contributors

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-contributors-post)

```js
const contributors = await lokaliseApi.contributors().create([
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

contributors[0].user_id
```

## Update contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-contributor-put)

```js
const contributor = await lokaliseApi.contributors().update(
  user_id,
  {is_admin: true},
  {project_id: project_id}
);

contributor.user_id;
```

## Delete contributor

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-contributor-delete)

```js
const response = await lokaliseApi.contributors().delete(user_id, {project_id: project_id});

response.contributor_deleted;
```
