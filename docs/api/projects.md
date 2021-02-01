# Projects

[Project attributes](https://app.lokalise.com/api2docs/curl/#object-projects)

## Fetch projects

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-projects-get)

```js
const projects = await lokaliseApi.projects.list({ page: 3, limit: 2 });

projects.items[0].name;
```

## Fetch a single project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-project-get)

```js
const project = await lokaliseApi.projects.get(project_id);

project.project_type;
```

## Create a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-project-post)

```js
const project = await lokaliseApi.projects.create({ name: "Project name", description: "Project description" });

project.project_id;
```

## Update a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-project-put)

```js
const project = await lokaliseApi.projects.update(project_id,
  { name: "New name", description: "New description"}
);

project.name;
```

## Empty a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-empty-a-project-put)

Deletes *all* keys and translations from the project.

```js
const response = await lokaliseApi.projects.empty(project_id);

response.project_id;
```

## Delete a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-project-delete)

```js
const response = await lokaliseApi.projects.delete(project_id);

response.project_deleted;
```
