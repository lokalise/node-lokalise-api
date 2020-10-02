# Branches

[Branches attributes](https://app.lokalise.com/api2docs/curl/#resource-branches)

## Fetch branches

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-branches-get)

```js
lokaliseApi.branches.list({project_id: project_id});
```

## Fetch branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```js
lokaliseApi.branches.get(branch_id, {project_id: project_id});
```

## Create branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```js
lokaliseApi.branches.create(
  {"name": "hotfix/really-important"},
  { project_id: project_id}
);
```

## Update branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-branch-put)

```js
lokaliseApi.branches.update(branch_id,
  {"name": "hotfix/not-really-important"},
  {project_id: project_id}
);
```

## Delete branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-branch-delete)

```js
lokaliseApi.branches.delete(branch_id, {project_id: project_id});
```

## Merge branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-merge-a-branch-post)

```js
lokaliseApi.branches.merge(branch_id_to_merge,
  {project_id: project_id},
  {"force_conflict_resolve_using": "master"}
)
```
