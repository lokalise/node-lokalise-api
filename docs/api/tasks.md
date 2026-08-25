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

When creating a translation task, there are two options. `translation` creates a manual task: you delegate the work to the translators you assign to each language. `automatic_translation` has the work performed by an automation instead — `translation_engine` picks which one, either `ai` (the default, Lokalise AI) or the `google` / `deepl` machine translation engines:

```js
const task = await lokaliseApi.tasks().create(
  {
    title: 'node mt task',
    task_type: 'automatic_translation',
    translation_engine: 'deepl', // 'ai' (default), 'google' or 'deepl'
    keys: [key1, key2],
    source_language_iso: 'en',
    languages: [
      {
        "language_iso": "de"
      }
    ]
  },
  {project_id: project_id}
);
```

`translation_engine` is accepted only for `automatic_translation` tasks. Machine translation does not accept `save_ai_translation_to_tm`, and the engine must support the requested language pair.

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
