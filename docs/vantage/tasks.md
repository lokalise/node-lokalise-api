---
---
# Tasks

## List tasks

[API doc](https://developers.lokalise.com/reference/get_v1-teams-teamid-projects-projectid-tasks)

```js
const tasks = await lokaliseVantageApi
  .tasks()
  .list({ team_id, project_id });

const task = tasks.items[0];

task.title; // "My task"
task.type; // "review"
```