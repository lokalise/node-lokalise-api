# Comments

[Comments attributes](https://app.lokalise.com/api2docs/curl/#resource-comments)

## Fetch project comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-comments-get)

```js
const comments = await lokaliseApi.comments().list_project_comments({
  project_id: project_id,
  page: 2,
  limit: 3
});

comments.items[0].comment_id;
```

## Fetch key comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-key-comments-get)

```js
const comments =  lokaliseApi.comments().list({
  project_id: project_id,
  key_id: key_id,
  page: 2,
  limit: 3
});

comments.items[0].comment_id;
```

## Create key comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-comments-post)

```js
const comments = await lokaliseApi.comments().create(
  [
    { comment: "Project comment 1" },
    { comment: "Project comment 2" }
  ], { project_id: project_id, key_id: key_id });

comments[0].comment;
```

## Fetch key comment

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-comment-get)

```js
const comment = await lokaliseApi.comments().get(comment_id, {project_id: project_id, key_id: key_id});

comment.comment_id;
```

## Delete key comment

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-comment-delete)

```js
const response = await lokaliseApi.comments().delete(comment_id, {project_id: project_id, key_id: key_id});

response.comment_deleted;
```
