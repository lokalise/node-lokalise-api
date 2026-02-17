---
---
# Snapshots

[Snapshot attributes](https://app.lokalise.com/api2docs/curl/#object-snapshots)

## Fetch snapshots

[API doc](https://developers.lokalise.com/reference/list-all-snapshots)

```js
const snapshots = await lokaliseApi.snapshots().list({
  project_id: project_id,
  page: 2,
  limit: 1,
});

snapshots.items[0].snapshot_id;
```

## Create snapshot

[API doc](https://developers.lokalise.com/reference/create-a-snapshot)

```js
const snapshot = await lokaliseApi.snapshots().create({"title": "API snapshot"}, {project_id: project_id});

snapshot.snapshot_id;
```

## Restore snapshot

[API doc](https://developers.lokalise.com/reference/restore-a-snapshot)

```js
const response = await lokaliseApi.snapshots().restore(snapshot_id, {project_id: project_id});

response.project_id;
```

## Delete snapshot

[API doc](https://developers.lokalise.com/reference/delete-a-snapshot)

```js
const response = await lokaliseApi.snapshots().delete(snapshot_id, {project_id: project_id});

response.snapshot_deleted;
```
