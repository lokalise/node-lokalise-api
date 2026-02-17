---
---
# Branches

## Fetch branches

[API doc](https://developers.lokalise.com/reference/list-all-branches)

```js
const branches = await lokaliseApi.branches().list({project_id: project_id, page: 2, limit: 3});

branches.items[0].branch_id;
```

## Fetch branch

[API doc](https://developers.lokalise.com/reference/retrieve-a-branch)

```js
const branch = await lokaliseApi.branches().get(branch_id, {project_id: project_id});

branch.name;
```

## Create branch

[API doc](https://developers.lokalise.com/reference/retrieve-a-branch)

```js
const branch = await lokaliseApi.branches().create(
  {"name": "hotfix/really-important"},
  { project_id: project_id}
);

branch.name;
```

## Update branch

[API doc](https://developers.lokalise.com/reference/update-a-branch)

```js
const branch = await lokaliseApi.branches().update(branch_id,
  {"name": "hotfix/not-really-important"},
  {project_id: project_id}
);

branch.name;
```

## Delete branch

[API doc](https://developers.lokalise.com/reference/delete-a-branch)

```js
const response = await lokaliseApi.branches().delete(branch_id, {project_id: project_id});

response.branch_deleted;
```

## Merge branch

[API doc](https://developers.lokalise.com/reference/merge-a-branch)

```js
const response = await lokaliseApi.branches().merge(branch_id_to_merge,
  {project_id: project_id},
  {"force_conflict_resolve_using": "master"}
)

response.branch_merged;
```
