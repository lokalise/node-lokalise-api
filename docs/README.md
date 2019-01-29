
Node Lokalise API
=================

Lokalise lets you manage translations of your app, game or website – either on your own or with a team of collaborators.

Development is in progress. Currently, you may use open-source implementations like [this](https://github.com/tormozz48/node-lokalise-api)

Lokalise API [documentation](https://lokalise.co/api2docs/curl/#resource-getting-started)

[Wrapper's Documentation](https://github.com/lokalise/node-lokalise-api/tree/master/docs/README.md)

Getting started
---------------

```bash
npm install @lokalise/node-api
```

```js
const { LokaliseApi } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});

const projects = await lokaliseApi.projects.list();
```

Usage
-----

Every reuqest return a promise with a corresponding object or array of object as the result.

### Projects

#### List projects

Params like page or limit are optional.

```js
lokaliseApi.projects.list({ page: 1, limit: 1000 });
```

#### Create project

```js
lokaliseApi.projects.create({ name: "Project name", description: "Project description" });
```

#### Destroy project

```js
lokaliseApi.projects.delete(projectId);
```

#### Update project

```js
lokaliseApi.projects.update(<projectId>, { name: "New name", description: "New description"});
```

### Comments

#### List project comments

You should pass project\_id as a parameter

```js
lokaliseApi.comments.list({ project_id: <projectId>});
```

#### Create project comments

Return promise array of comments

```js
lokaliseApi.comments.create({ 
  'comments': [
      { comment: "Project comment 1" },
      { comment: "Project comment 2" }
    ],
    { project_id: '<projectId>'});
```

#### Destroy project

```js
lokaliseApi.projects.delete(<projectId>, { key_id: <keyId>, project_id: <projectId> });
```

#### Update project

```js
lokaliseApi.projects.update(<projectId>, { name: "New name", description: "New description"});
```

## Index

### External modules

* ["collections/base_collection"](modules/_collections_base_collection_.md)
* ["collections/comments"](modules/_collections_comments_.md)
* ["collections/contributors"](modules/_collections_contributors_.md)
* ["collections/files"](modules/_collections_files_.md)
* ["collections/index"](modules/_collections_index_.md)
* ["collections/keys"](modules/_collections_keys_.md)
* ["collections/languages"](modules/_collections_languages_.md)
* ["collections/projects"](modules/_collections_projects_.md)
* ["collections/screenshots"](modules/_collections_screenshots_.md)
* ["collections/snapshots"](modules/_collections_snapshots_.md)
* ["collections/tasks"](modules/_collections_tasks_.md)
* ["collections/team_users"](modules/_collections_team_users_.md)
* ["collections/teams"](modules/_collections_teams_.md)
* ["collections/translations"](modules/_collections_translations_.md)
* ["collections/user_groups"](modules/_collections_user_groups_.md)
* ["http_client/base"](modules/_http_client_base_.md)
* ["http_client/headers"](modules/_http_client_headers_.md)
* ["interfaces/bulk_update_key"](modules/_interfaces_bulk_update_key_.md)
* ["interfaces/comment"](modules/_interfaces_comment_.md)
* ["interfaces/download_file_params"](modules/_interfaces_download_file_params_.md)
* ["interfaces/file_params"](modules/_interfaces_file_params_.md)
* ["interfaces/index"](modules/_interfaces_index_.md)
* ["interfaces/key"](modules/_interfaces_key_.md)
* ["interfaces/language"](modules/_interfaces_language_.md)
* ["interfaces/project"](modules/_interfaces_project_.md)
* ["interfaces/standart_params"](modules/_interfaces_standart_params_.md)
* ["interfaces/upload_file_params"](modules/_interfaces_upload_file_params_.md)
* ["lokalise/api_methods"](modules/_lokalise_api_methods_.md)
* ["lokalise/lokalise"](modules/_lokalise_lokalise_.md)
* ["main"](modules/_main_.md)
* ["models/base_model"](modules/_models_base_model_.md)
* ["models/comment"](modules/_models_comment_.md)
* ["models/contributor"](modules/_models_contributor_.md)
* ["models/file"](modules/_models_file_.md)
* ["models/key"](modules/_models_key_.md)
* ["models/language"](modules/_models_language_.md)
* ["models/project"](modules/_models_project_.md)
* ["models/screenshot"](modules/_models_screenshot_.md)
* ["models/snapshot"](modules/_models_snapshot_.md)
* ["models/task"](modules/_models_task_.md)
* ["models/team"](modules/_models_team_.md)
* ["models/team_user"](modules/_models_team_user_.md)
* ["models/translation"](modules/_models_translation_.md)
* ["models/user_group"](modules/_models_user_group_.md)

---

