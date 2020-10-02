# Comments

[Comments attributes](https://app.lokalise.com/api2docs/curl/#resource-comments)

## Fetch project comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-comments-get)

```js
lokaliseApi.comments.list_project_comments({ project_id: project_id });
```

## Fetch key comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-key-comments-get)

```js
lokaliseApi.comments.list({project_id: project_id, key_id: key_id})
```

## Create key comments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-comments-post)

```js
lokaliseApi.comments.create({
  'comments': [
    { comment: "Project comment 1" },
    { comment: "Project comment 2" }
  ]
}, { project_id: project_id, key_id: key_id});
```

## Fetch key comment

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-comment-get)

```js
lokaliseApi.comments.get(comment_id, {project_id: project_id, key_id: key_id});
```

## Delete key comment

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-comment-delete)

```js
lokaliseApi.comments.delete(comment_id, {project_id: project_id, key_id: key_id});
```
