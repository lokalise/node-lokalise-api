# Branches

[Branches attributes](https://app.lokalise.com/api2docs/curl/#resource-branches)

## Fetch branches

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-branches-get)

```js
const branches = await lokaliseApi.branches().list({project_id: project_id, page: 2, limit: 3});

branches.items[0].branch_id;
```

## Fetch branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```js
const branch = await lokaliseApi.branches().get(branch_id, {project_id: project_id});

branch.name;
```

## Create branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```js
const branch = await lokaliseApi.branches().create(
  {"name": "hotfix/really-important"},
  { project_id: project_id}
);

branch.name;
```

## Update branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-branch-put)

```js
const branch = await lokaliseApi.branches().update(branch_id,
  {"name": "hotfix/not-really-important"},
  {project_id: project_id}
);

branch.name;
```

## Delete branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-branch-delete)

```js
const response = await lokaliseApi.branches().delete(branch_id, {project_id: project_id});

response.branch_deleted;
```

## Merge branch

[API doc](https://app.lokalise.com/api2docs/curl/#transition-merge-a-branch-post)

```js
const response = await lokaliseApi.branches().merge(branch_id_to_merge,
  {project_id: project_id},
  {"force_conflict_resolve_using": "master"}
)

response.branch_merged;
```
