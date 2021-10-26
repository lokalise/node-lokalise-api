# Tasks

[Task attributes](https://app.lokalise.com/api2docs/curl/#resource-tasks)

## Fetch tasks

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-tasks-get)

```js
const tasks = await lokaliseApi.tasks().list({
  project_id: project_id,
  page: 2,
  limit: 1,
});

tasks.items[0].task_id;
```

## Fetch a single task

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-task-get)

```js
const task = await lokaliseApi.tasks().get(task_id, {project_id: project_id});

task.title;
```

## Create task

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-task-post)

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

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-task-put)

```js
const task = await lokaliseApi.tasks().update(
  task_id,
  {title: 'node updated'},
  {project_id: project_id}
);

task.title;
```

## Delete task

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-task-delete)

```js
const response = await lokaliseApi.tasks().delete(task_id, {project_id: project_id});

response.task_deleted;
```
