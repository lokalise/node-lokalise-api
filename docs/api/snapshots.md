# Snapshots

[Snapshot attributes](https://app.lokalise.com/api2docs/curl/#object-snapshots)

## Fetch snapshots

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-snapshots-get)

```js
lokaliseApi.snapshots.list({project_id: project_id});
```

## Create snapshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-snapshot-post)

```js
lokaliseApi.snapshots.create({"title": "API snapshot"}, {project_id: project_id});
```

## Restore snapshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-restore-a-snapshot-post)

```js
lokaliseApi.snapshots.restore(snapshot_id, {project_id: project_id});
```

## Delete snapshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-snapshot-delete)

```js
lokaliseApi.snapshots.delete(snapshot_id, {project_id: project_id});
```
