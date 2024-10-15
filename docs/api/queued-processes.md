# Queued processes

[Queued processes attributes](https://developers.lokalise.com/reference/queued-process-object)

## Fetch queued processes

[API doc](https://developers.lokalise.com/reference/list-all-processes)

```js
const processes = await lokaliseApi.queuedProcesses().list({
  project_id: project_id,
  limit: 1,
  page: 2,
});

processes.items[0].type;
```

## Fetch a single queued process

[API doc](https://developers.lokalise.com/reference/retrieve-a-process)

```js
const process = await lokaliseApi.queuedProcesses().get(process_id, { project_id: project_id });

process.status;
```
