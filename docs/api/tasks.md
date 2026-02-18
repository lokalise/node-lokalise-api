---
---
# Tasks

## Fetch tasks

[API doc](https://developers.lokalise.com/reference/list-all-tasks)

```js
const tasks = await lokaliseApi.tasks().list({
  project_id: project_id,
  page: 2,
  limit: 1,
});

tasks.items[0].task_id;
```

## Fetch a single task

[API doc](https://developers.lokalise.com/reference/retrieve-a-task)

```js
const task = await lokaliseApi.tasks().get(task_id, {project_id: project_id});

task.title;
```

## Create task

[API doc](https://developers.lokalise.com/reference/create-a-task)

```js
const task = await lokaliseApi.tasks().create(
  {
    title: 'node task',
    keys: [key1, key2],
    languages: [
      {
        "language_iso": "en",
        "users": [user1, user2]
      }
    ]
  }, 
  {project_id: project_id}
);

task.task_id;
```

## Update task

[API doc](https://developers.lokalise.com/reference/update-a-task)

```js
const task = await lokaliseApi.tasks().update(
  task_id,
  {title: 'node updated'},
  {project_id: project_id}
);

task.title;
```

## Delete task

[API doc](https://developers.lokalise.com/reference/delete-a-task)

```js
const response = await lokaliseApi.tasks().delete(task_id, {project_id: project_id});

response.task_deleted;
```
