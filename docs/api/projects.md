# Projects

[Project attributes](https://developers.lokalise.com/reference/project-object)

## Fetch projects

[API doc](https://developers.lokalise.com/reference/list-all-projects)

```js
const projects = await lokaliseApi.projects().list({ page: 3, limit: 2 });

projects.items[0].name;
```

## Fetch a single project

[API doc](https://developers.lokalise.com/reference/retrieve-a-project)

```js
const project = await lokaliseApi.projects().get(project_id);

project.project_type;
```

## Create a project

[API doc](https://developers.lokalise.com/reference/create-a-project)

```js
const project = await lokaliseApi.projects().create({ name: "Project name", description: "Project description" });

project.project_id;
```

## Update a project

[API doc](https://developers.lokalise.com/reference/update-a-project)

```js
const project = await lokaliseApi.projects().update(project_id,
  { name: "New name", description: "New description"}
);

project.name;
```

## Empty a project

[API doc](https://developers.lokalise.com/reference/empty-a-project)

Deletes *all* keys and translations from the project.

```js
const response = await lokaliseApi.projects().empty(project_id);

response.project_id;
```

## Delete a project

[API doc](https://developers.lokalise.com/reference/delete-a-project)

```js
const response = await lokaliseApi.projects().delete(project_id);

response.project_deleted;
```
