
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
lokaliseApi.comments.list_project_comments({ project_id: <projectId>});
```

#### List comments

You should pass project\_id, id as a parameters

```js
lokaliseApi.comments.list_project_comments({ project_id: <projectId>, key_id: <key_id>});
```

#### Get a comment

You should pass commentId and project\_id, key\_id as a parameters

```js
lokaliseApi.comments.get(<commentId>, { project_id: <projectId>, key_id: <key_id>});
```

#### Create project comments

Return promise array of comments

```js
lokaliseApi.comments.create({ 
  'comments': [
      { comment: "Project comment 1" },
      { comment: "Project comment 2" }
    ],
    { project_id: '<projectId>', key_id: '<keyId>'});
```

#### Destroy a comment

```js
lokaliseApi.comments.delete(<commentId>, { project_id: <projectId>, key_id: <keyId> });
```

### Contributors

#### List project contributors

You should pass project\_id as a parameter

```js
lokaliseApi.contributors.list({ project_id: <projectId> });
```

#### Get a project contributor

You should pass contributorId and project\_id as a parameter

```js
lokaliseApi.contributors.get(<contributorId>, { project_id: <projectId> });
```

#### Create a project contributor

You should pass contributors object and project\_id as a parameter

```js
lokaliseApi.contributors.get({
                "contributors": [
                    {
                        "email": "translator@mycompany.com",
                        "fullname": "Mr. Translator",
                        "is_admin": false,
                        "is_reviewer": true,
                        "languages": [
                            {
                                "lang_iso": "en",
                                "is_writable": false
                            },
                            {
                                "lang_iso": "ru",
                                "is_writable": true
                            }
                        ],
                        "admin_rights": [
                            "keys", "languages"
                        ]
                    }
                ]
            },

            { project_id: <projectId>, key_id: <key_id>});
```

#### Delete a project contributor

You should pass contributorId and project\_id as a parameter

```js
lokaliseApi.contributors.delete(<contributorId>, {project_id: <projectId>});
```

### Files

#### List project files

Params like page or limit are optional.

```js
lokaliseApi.files.list({ project_id: <projectId>, page: 1, limit: 1000 });
```

#### Upload a file

```js
lokaliseApi.files.upload(<projectId>, {
        "filename": "index.json",
        "data": "D94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGL.....",
        "lang_iso": "en",
        "tags": [
            "index", "admin", "v2.0"
        ],
        "convert_placeholders": true
      }
    });
```

#### Download a file

```js
lokaliseApi.files.download(<projectId>, {
    "format": "json",
    "original_filenames": true
});
```

### Keys

#### List project files

Params like page or limit are optional.

```js
lokaliseApi.files.list({ project_id: <projectId>, page: 1, limit: 1000 });
```

#### Upload a file

```js
lokaliseApi.files.upload(<projectId>, {
        "filename": "index.json",
        "data": "D94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGL.....",
        "lang_iso": "en",
        "tags": [
            "index", "admin", "v2.0"
        ],
        "convert_placeholders": true
      }
    });
```

#### Download a file

```js
lokaliseApi.files.download(<projectId>, {
    "format": "json",
    "original_filenames": true
});
```

### Keys

#### List project keys

```js
lokaliseApi.keys.list({project_id: <projectId>, page: 1, limit: 1})
```

#### Create project keys

```js
lokaliseApi.keys.create({
    "keys": [
        {
            "key_name": "index.welcome",
            "description": "Index app welcome",
            "platforms": [
                "web"
            ],
            "translations": [
                {
                    "language_iso": "en",
                    "translation": "Welcome"
                }
            ]
        },
        {
            "key_name": "index.apple",
            "description": "Welcome apple",
            "platforms": [
                "web"
            ],
            "is_plural": true,
            "translations": [
                {
                    "language_iso": "en",
                    "translation": {
                        "one": "I have one apple",
                        "other": "I have a lot of apples"
                    }
                }
            ]
        },
        {
            "key_name": "index.hello",
            "platforms": [
                "web"
            ]
        }
    ]
}, 

{project_id: <projectId, page: 1, limit: 1>});
```

#### Update a key

lokaliseApi.keys.update(, { "platforms": \[ "web","other" \], "description": "Index app welcome" },

{ project\_id: });

```

#### Update keys bulk

```

lokaliseApi.keys.bulk\_update({ "keys": \[ { "key\_id": 331223, "key\_name": "index.welcome", "description": "Index app welcome", "platforms": \[ "web" \] }, { "key\_id": 331224, "key\_name": "index.hello", "description": "Index greetings", "platforms": \[ "web" \] } \] }, { project\_id: });

```

#### Destroy a key

lokaliseApi.keys.delete(<keyId>, { project_id: <projectId> });

#### Destroy keys

```

lokaliseApi.keys.bulkdelete({ "keys": \[ 12345, 12346 \] }, { project\_id: });

```

### Languages

#### List system languages

```

lokaliseApi.languages.system\_languages({page: 1, limit: 10000})

```

#### List project languages

```

lokaliseApi.languages.list({project\_id: });

```

#### Create project language

```

lokaliseApi.languages.create({ "languages": \[ { "lang\_iso": "en" }, { "lang\_iso": "ru"  
} \]}, { project\_id: });

```

#### Get a project language

```

lokaliseApi.languages.create({ "languages": \[ { "lang\_iso": "en" }, { "lang\_iso": "ru"  
} \]}, { project\_id: });

```

#### Create a project language

```

lokaliseApi.languages.create({project\_id: })

```

#### Update a project language

```

lokaliseApi.languages.update(, { "lang\_iso": "en-US", "plural\_forms": \[ "one", "zero", "few", "other" \] }, {project\_id: });

```

#### Delete a project language

```

lokaliseApi.languages.delete(, { project\_id: });

```

### Screenshots

#### List screenshots

```

lokaliseApi.screenshots.list({project\_id: });

```

#### Create screenshots

```

lokaliseApi.screenshots.create({ "screenshots": \[ { "data": "data:image/jpeg;base64,D94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGL.....", "ocr": false, "key\_ids": \[ 1132290, 1132292, 1132293 \], "tags": \[ "onboarding" \] } \] }, {project\_id: });

```

#### Get a screenshots

```

lokaliseApi.screenshots.get(, {project\_id: });

```

#### Update a screenshots

```

lokaliseApi.screenshots.update(, { "key\_ids": \[ 1132290, 1132292 \], "tags": \[ "main" \] } ,{project\_id: });

```

#### Delete a screenshots

```

lokaliseApi.screenshots.delete(, { project\_id: });

```

### Snapshots

#### List snapshots

```

lokaliseApi.screenshots.list({project\_id: });

```

#### Create a snapshot

```

lokaliseApi.screenshots.create({ "title": "API snapshot" }, {project\_id: });

```

#### Restore a snapshot

```

lokaliseApi.screenshots.restore({ project\_id: , id: });

```

#### Delete a snapshot

```

lokaliseApi.screenshots.delete({ project\_id: , id: });

```

### Tasks

#### List tasks

```

lokaliseApi.tasks.list({project\_id: });

```

#### Create a task

```

lokaliseApi.tasks.create({ "title": "Voicemail messages", "description": "Need your help with some voicemail message translation. Thanks!", "due\_date": "2018-12-31 12:00:00 (Etc/UTC)", "keys": \[ 11212, 11241, 11245 \], "languages": \[ { "language\_iso": "fi", "users": \[ 421 \] }, { "language\_iso": "ru", "groups": \[ 191 \] } \], "auto\_close\_languages": true, "auto\_close\_task": true, "task\_type": "translation", "parent\_task\_id": 12345, "closing\_tags": \["tag\_one", "tag\_two"\], "do\_lock\_translations": true }, {project\_id: });

```

#### Get a task

```

lokaliseApi.tasks.restore({ project\_id: , id: });

```

#### Delete a task

```

lokaliseApi.tasks.delete(id: , { project\_id: });

```

### Teams

#### List teams

```

lokaliseApi.screenshots.list({ page 1, limit: 10000 });

```

### Team users

#### List team users

```

lokaliseApi.team\_users.list({project\_id: });

```

#### Get a team user

```

lokaliseApi.team\_users.get(, { project\_id: });

```

#### Update a team user

```

lokaliseApi.tasks.update(, { "role": "admin" }, { project\_id: });

```

#### Delete a team user

```

lokaliseApi.tasks.delete(, { project\_id: });

```

### Team user group

#### List team user group
```

lokaliseApi.user\_groups.list({ team\_id: });

```

#### List team user group

```

lokaliseApi.user\_groups.create({ "name": "Proofreaders", "is\_reviewer": true, "is\_admin": false, "admin\_rights": \[\], "languages": { "reference": \[\], "contributable": \[640\] } }, { team\_id: });

```

#### Get a team user group

```

lokaliseApi.user\_groups.get(, { team\_id: });

```

#### Add project to a group

```

lokaliseApi.user\_groups.add\_project\_to\_group(, , { "projects": \[ "598901215bexxx43dcba74.xxx" \] });

```

#### Remove a project from group 

```

lokaliseApi.user\_groups.remove\_project\_to\_group(, , { "projects": \[ "598901215bexxx43dcba74.xxx" \] }); `` ` ``

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

