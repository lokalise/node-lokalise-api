# Tasks

[Task attributes](https://app.lokalise.com/api2docs/curl/#resource-tasks)

## Fetch tasks

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-tasks-get)

```js
lokaliseApi.tasks.list({project_id: project_id});
```

## Fetch a single task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-task-get)

```js
lokaliseApi.tasks.get(task_id, {project_id: project_id});
```

## Create task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-task-post)

```js
lokaliseApi.tasks.create({
  title: 'node task',
  keys: [key1, key2],
  languages: [
    {
      "language_iso": "en",
      "users": [user1, user2]
    }
  ]
}, {project_id: project_id});
```

## Update task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-task-put)

```js
lokaliseApi.tasks.update(
  task_id,
  {title: 'node updated'},
  {project_id: project_id}
);
```

## Delete task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-task-delete)

```js
lokaliseApi.tasks.delete(task_id, {project_id: project_id});
```
