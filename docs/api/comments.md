---
---
# Comments

[Comments attributes](https://developers.lokalise.com/reference/comment-object)

## Fetch project comments

[API doc](https://developers.lokalise.com/reference/list-project-comments)

```js
const comments = await lokaliseApi.comments().list_project_comments({
  project_id: project_id,
  page: 2,
  limit: 3
});

comments.items[0].comment_id;
```

## Fetch key comments

[API doc](https://developers.lokalise.com/reference/list-key-comments)

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

[API doc](https://developers.lokalise.com/reference/create-comments)

```js
const comments = await lokaliseApi.comments().create(
  [
    { comment: "Project comment 1" },
    { comment: "Project comment 2" }
  ], { project_id: project_id, key_id: key_id });

comments[0].comment;
```

## Fetch key comment

[API doc](https://developers.lokalise.com/reference/retrieve-a-comment)

```js
const comment = await lokaliseApi.comments().get(comment_id, {project_id: project_id, key_id: key_id});

comment.comment_id;
```

## Delete key comment

[API doc](https://developers.lokalise.com/reference/delete-a-comment)

```js
const response = await lokaliseApi.comments().delete(comment_id, {project_id: project_id, key_id: key_id});

response.comment_deleted;
```
