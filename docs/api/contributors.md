# Contributors

[Contributor attributes](https://developers.lokalise.com/reference/contributor-object)

## Fetch contributors

[API doc](https://developers.lokalise.com/reference/list-all-contributors)

```js
const contributors = await lokaliseApi.contributors().list({
  project_id: project_id,
  page: 2,
  limit: 3
});

contributors.items[0].user_id;
```

## Fetch a single contributor

[API doc](https://developers.lokalise.com/reference/retrieve-a-contributor)

```js
const contributor = await lokaliseApi.contributors().get(user_id, {project_id: project_id});

contributor.email;
```

## Create contributors

[API doc](https://developers.lokalise.com/reference/create-contributors)

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

[API doc](https://developers.lokalise.com/reference/update-a-contributor)

```js
const contributor = await lokaliseApi.contributors().update(
  user_id,
  {is_admin: true},
  {project_id: project_id}
);

contributor.user_id;
```

## Delete contributor

[API doc](https://developers.lokalise.com/reference/delete-a-contributor)

```js
const response = await lokaliseApi.contributors().delete(user_id, {project_id: project_id});

response.contributor_deleted;
```
