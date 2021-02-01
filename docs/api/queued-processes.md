# Queued processes

[Queued processes attributes](https://app.lokalise.com/api2docs/curl/#object-queued-processes)

## Fetch queued processes

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-processes-get)

```js
const processes = await lokaliseApi.queuedProcesses.list({
  project_id: project_id,
  limit: 1,
  page: 2,
});

processes.items[0].type;
```

## Fetch a single queued process

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-process-get)

```js
const process = await lokaliseApi.queuedProcesses.get(process_id, { project_id: project_id });

process.status;
```
