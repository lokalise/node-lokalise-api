# Lokalise API 2.0 official Node.js client

Lokalise lets you manage translations of your app, game or website – either on your own or with a team of collaborators.

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



<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Lokalise API 2.0 official Node.js client](#lokalise-api-20-official-nodejs-client)
  - [Getting started](#getting-started)
  - [Usage](#usage)
    - [Projects](#projects)
      - [List projects](#list-projects)
      - [Create project](#create-project)
      - [Destroy project](#destroy-project)
      - [Update project](#update-project)
    - [Comments](#comments)
      - [List project comments](#list-project-comments)
      - [List comments](#list-comments)
      - [Get a comment](#get-a-comment)
      - [Create project comments](#create-project-comments)
      - [Destroy a comment](#destroy-a-comment)
    - [Contributors](#contributors)
      - [List project contributors](#list-project-contributors)
      - [Get a project contributor](#get-a-project-contributor)
      - [Create a project contributor](#create-a-project-contributor)
      - [Delete a project contributor](#delete-a-project-contributor)
    - [Files](#files)
      - [List project files](#list-project-files)
      - [Upload a file](#upload-a-file)
      - [Download a file](#download-a-file)
    - [Keys](#keys)
      - [List project files](#list-project-files-1)
      - [Upload a file](#upload-a-file-1)
      - [Download a file](#download-a-file-1)
    - [Keys](#keys-1)
      - [List project keys](#list-project-keys)
      - [Create project keys](#create-project-keys)
      - [Update a key](#update-a-key)
      - [Update keys bulk](#update-keys-bulk)
      - [Destroy a key](#destroy-a-key)
      - [Destroy keys](#destroy-keys)
    - [Languages](#languages)
      - [List system languages](#list-system-languages)
      - [List project languages](#list-project-languages)
      - [Create project language](#create-project-language)
      - [Get a project language](#get-a-project-language)
      - [Update a project language](#update-a-project-language)
      - [Delete a project language](#delete-a-project-language)
    - [Screenshots](#screenshots)
      - [List screenshots](#list-screenshots)
      - [Create screenshots](#create-screenshots)
      - [Get a screenshots](#get-a-screenshots)
      - [Update a screenshots](#update-a-screenshots)
      - [Delete a screenshots](#delete-a-screenshots)
    - [Snapshots](#snapshots)
      - [List snapshots](#list-snapshots)
      - [Create a snapshot](#create-a-snapshot)
      - [Restore a snapshot](#restore-a-snapshot)
      - [Delete a snapshot](#delete-a-snapshot)
    - [Tasks](#tasks)
      - [List tasks](#list-tasks)
      - [Create a task](#create-a-task)
      - [Get a task](#get-a-task)
      - [Delete a task](#delete-a-task)
    - [Teams](#teams)
      - [List teams](#list-teams)
    - [Team users](#team-users)
      - [List team users](#list-team-users)
      - [Get a team user](#get-a-team-user)
      - [Update a team user](#update-a-team-user)
      - [Delete a team user](#delete-a-team-user)
    - [Team user group](#team-user-group)
      - [List team user group](#list-team-user-group)
      - [List team user group](#list-team-user-group-1)
      - [Get a team user group](#get-a-team-user-group)
      - [Add project to a group](#add-project-to-a-group)
      - [Remove a project from group](#remove-a-project-from-group)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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



