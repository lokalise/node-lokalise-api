# Queued processes

[Queued processes attributes](https://app.lokalise.com/api2docs/curl/#object-queued-processes)

## Fetch queued processes

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-processes-get)

```js
lokaliseApi.queuedProcesses.list({ project_id: project_id })
```

## Fetch a single queued process

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-process-get)

```js
lokaliseApi.queuedProcesses.get(process_id, { project_id: project_id })
```
