# Node Lokalise API

Lokalise lets you manage translations of your app, game or website – either on your own or with a team of collaborators.

Development is in progress. Currently, you may use open-source implementations like [this](https://github.com/tormozz48/node-lokalise-api)

Lokalise API [documentation](https://lokalise.co/api2docs/curl/#resource-getting-started)

[Wrapper's Documentation](https://github.com/lokalise/node-lokalise-api/tree/master/docs/README.md)


## Getting started

```bash
npm install @lokalise/node-api
```

```js
const { LokaliseApi } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});

const projects = await lokaliseApi.projects.list();
```

## Usage

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

You should pass project_id as a parameter

```js
lokaliseApi.comments.list_project_comments({ project_id: <projectId>});
```

#### List comments

You should pass project_id, id as a parameters

```js
lokaliseApi.comments.list_project_comments({ project_id: <projectId>, key_id: <key_id>});
```

#### Get a comment

You should pass commentId and project_id, key_id as a parameters

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

You should pass project_id as a parameter

```js
lokaliseApi.contributors.list({ project_id: <projectId> });
```

#### Get a project contributor

You should pass contributorId and project_id as a parameter

```js
lokaliseApi.contributors.get(<contributorId>, { project_id: <projectId> });
```

#### Create a project contributor

You should pass contributors object and project_id as a parameter

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

You should pass contributorId and project_id as a parameter

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

```
lokaliseApi.keys.update(<keyId>, {
    "platforms": [
        "web","other"
    ],
    "description": "Index app welcome"
},

{ project_id: <projectId> });
```

#### Update keys bulk

```
lokaliseApi.keys.bulk_update({
    "keys": [
        {
            "key_id": 331223,
            "key_name": "index.welcome",
            "description": "Index app welcome",
            "platforms": [
                "web"
           ]
        },
        {
            "key_id": 331224,
            "key_name": "index.hello",
            "description": "Index greetings",
            "platforms": [
                "web"
           ]
        }
    ]
}, { project_id: <projectId>});
```


#### Destroy a key

```
lokaliseApi.keys.delete(<keyId>, { project_id: <projectId> });
```


#### Destroy keys

```
lokaliseApi.keys.bulkdelete({
        "keys": [
            12345, 12346
        ]
    }, { project_id: <projectId> });
```


### Languages

#### List system languages

```
lokaliseApi.languages.system_languages({page: 1, limit: 10000})
```

#### List project languages

```
lokaliseApi.languages.list({project_id: <projectId>});
```

#### Create project language

```
lokaliseApi.languages.create({
      "languages": [
          {
              "lang_iso": "en"
          },
          {
              "lang_iso": "ru"                        
          }
      ]},
      { project_id: <projectId> });
```


#### Get a project language

```
lokaliseApi.languages.get(<languageId>, { project_id: <projectId> });
```

#### Update a project language

```
lokaliseApi.languages.update(<languageId>, {
          "lang_iso": "en-US",
          "plural_forms": [
              "one", "zero", "few", "other"
          ]
      }, {project_id: <projectId>});
```

#### Delete a project language

```
lokaliseApi.languages.delete(<languageId>, { project_id: <projectId> });
```


### Screenshots

#### List screenshots

```
lokaliseApi.screenshots.list({project_id: <projectId>});
```

#### Create screenshots

```
lokaliseApi.screenshots.create({
        "screenshots": [
            {
                "data": "data:image/jpeg;base64,D94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGL.....",
                "ocr": false,
                "key_ids": [
                    1132290, 1132292, 1132293
                ],
                "tags": [
                    "onboarding"
                ]
            }
        ]
    }, {project_id: <projectId>});
```


#### Get a screenshots

```
lokaliseApi.screenshots.get(<screenshotId>, {project_id: <projectId>});
```

#### Update a screenshots

```
lokaliseApi.screenshots.update(<screenshotId>, {
    "key_ids": [
        1132290, 1132292
    ],
    "tags": [
        "main"
    ]
} ,{project_id: <projectId>});
```

#### Delete a screenshots

```
lokaliseApi.screenshots.delete(<screenshotId>, { project_id: <projectId> });
```

### Snapshots

#### List snapshots

```
lokaliseApi.screenshots.list({project_id: <projectId>});
```

#### Create a snapshot

```
lokaliseApi.screenshots.create({ "title": "API snapshot" }, {project_id: <projectId>});
```

#### Restore a snapshot

```
lokaliseApi.screenshots.restore({ project_id: <projectId>, id: <snapshotId>});
```

#### Delete a snapshot

```
lokaliseApi.screenshots.delete({ project_id: <projectId>, id: <snapshotId>});
```


### Tasks

#### List tasks

```
lokaliseApi.tasks.list({project_id: <projectId>});
```

#### Create a task

```
lokaliseApi.tasks.create({
    "title": "Voicemail messages",
    "description": "Need your help with some voicemail message translation. Thanks!",
    "due_date": "2018-12-31 12:00:00 (Etc\/UTC)",
    "keys": [
        11212, 11241, 11245
    ],
    "languages": [
        {
            "language_iso": "fi",
            "users": [
                421
            ]
        },
        {
            "language_iso": "ru",
            "groups": [
                191
            ]
        }
    ],
    "auto_close_languages": true,
    "auto_close_task": true,
    "task_type": "translation",
    "parent_task_id": 12345,
    "closing_tags": ["tag_one", "tag_two"],
    "do_lock_translations": true
}, {project_id: <projectId>});
```

#### Get a task

```
lokaliseApi.tasks.get(<taskId>, { project_id: <projectId> });
```

#### Delete a task

```
lokaliseApi.tasks.delete(<taskId>, { project_id: <projectId>});
```


### Teams

#### List teams

```
lokaliseApi.screenshots.list({ page 1, limit: 10000 });
```

### Team users

#### List team users

```
lokaliseApi.team_users.list({project_id: <projectId>});
```

#### Get a team user

```
lokaliseApi.team_users.get(<teamUserId>, { project_id: <projectId> });
```

#### Update a team user

```
lokaliseApi.tasks.update(<teamUserId>, { "role": "admin" },
                        { project_id: <projectId> });
```

#### Delete a team user

```
lokaliseApi.tasks.delete(<teamUserId>, { project_id: <projectId> });
```

### Team user group

#### List team user group
```
lokaliseApi.user_groups.list({ team_id: <teamId> });
```

#### List team user group

```
lokaliseApi.user_groups.create({
      "name": "Proofreaders",
      "is_reviewer": true,
      "is_admin": false,
      "admin_rights": [],
      "languages": {
          "reference": [],
          "contributable": [640]
      }
  }, { team_id: <teamId> });
```

#### Get a team user group

```
lokaliseApi.user_groups.get(<groupId>, { team_id: <teamId> });
```

#### Add project to a group

```
lokaliseApi.user_groups.add_project_to_group(<teamId>, <groupId>, {
                          "projects": [
                              "598901215bexxx43dcba74.xxx"
                          ]
                      });
```

#### Remove a project from group 

```
lokaliseApi.user_groups.remove_project_from_group(<teamId>, <groupId>, {
                          "projects": [
                              "598901215bexxx43dcba74.xxx"
                          ]
                      });
```



