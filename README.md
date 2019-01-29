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

You should pass project_id, key_id as a parameters

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

