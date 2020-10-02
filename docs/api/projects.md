# Projects

[Project attributes](https://app.lokalise.com/api2docs/curl/#object-projects)

## Fetch projects

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-projects-get)

```js
lokaliseApi.projects.list();
```

## Fetch a single project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-project-get)

```js
lokaliseApi.projects.get(project_id)
```

## Create a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-project-post)

```js
lokaliseApi.projects.create({ name: "Project name", description: "Project description" });
```

## Update a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-project-put)

```js
lokaliseApi.projects.update(project_id, { name: "New name", description: "New description"});
```

## Empty a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-empty-a-project-put)

Deletes *all* keys and translations from the project.

```js
lokaliseApi.projects.empty(project_id)
```

## Delete a project

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-project-delete)

```js
lokaliseApi.projects.delete(project_id);
```
