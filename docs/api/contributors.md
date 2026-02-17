---
---
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

## Fetch current contributor (token-based)

[API doc](https://developers.lokalise.com/reference/retrieve-me-as-a-contributor)

This endpoint returns contributor in the given project based on the user whose token is used to send the request. In other words, it returns information about self in scope of a project.

```js
const current_contributor = await lokaliseApi.contributors().me({
  project_id: projectId,
});

current_contributor.fullname; // => "John Doe"
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
