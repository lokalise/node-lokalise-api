# Lokalise API 2.0 official Node.js client

[![npm version](https://badge.fury.io/js/%40lokalise%2Fnode-api.svg)](https://badge.fury.io/js/%40lokalise%2Fnode-api)
[![Build Status](https://travis-ci.org/lokalise/node-lokalise-api.svg?branch=master)](https://travis-ci.org/lokalise/node-lokalise-api)

Official Node interface for the [Lokalise API](https://lokalise.co/api2docs/node/#resource-getting-started).

## Index

* [Getting started](#getting-started)
  - [Installation](#installation)
  - [Initializing Client](#initializing-client)
* [Usage](#usage)
  + [Comments](#comments)
  + [Contributors](#contributors)
  + [Files](#files)
  + [Keys](#keys)
  + [Languages](#languages)
  + [Payment cards](#payment-cards)
  + [Projects](#projects)
  + [Screenshots](#screenshots)
  + [Snapshots](#snapshots)
  + [Tasks](#tasks)
  + [Teams](#teams)
  + [Team users](#team-users)
  + [Team user groups](#team-user-groups)
  + [Translation Providers](#translation-providers)
* [Additional Info](#additional-info)
* [Running Tests](#running-tests)
* [Building](#building)

## Getting started

### Installation

This library has no special requirements. Install it with [NPM](https://www.npmjs.com/):

```bash
npm install @lokalise/node-api
```

### Initializing Client

In order to perform API requests, you require a special token that can be obtained in your [personal profile](https://lokalise.co/profile#apitokens) (*API tokens* section). Note that the owner of the token must have admin access rights.

After you've obtained the token, initialize the client:

```js
const { LokaliseApi } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
```

Now you may perform API requests, for example:

```js
const projects = lokaliseApi.projects.list();
projects[0].name;
```

All object attributes may be found in the [interfaces](https://github.com/lokalise/node-lokalise-api/tree/master/src/interfaces).

### Pagination

Bulk fetches support [pagination](https://lokalise.co/api2docs/node/#resource-pagination). There are two common parameters available:

* `limit` (defaults to `100`, maximum is `5000`) - number of records to display per page
* `page` (defaults  to `1`) - page to fetch

For instance:

```js
lokaliseApi.translationProviders.list({team_id: team_id, page: 2, limit: 10});
```

## Usage

Every request returns a promise with a corresponding object (or array of objects) as the result.

### Comments

[Documentation](https://lokalise.co/api2docs/node/#object-comments)

#### List project comments

```js
lokaliseApi.comments.list_project_comments({ project_id: project_id });
```

#### List key comments

```js
lokaliseApi.comments.list({project_id: project_id, key_id: key_id})
```

#### Retrieve a comment

```js
lokaliseApi.comments.get(comment_id, {project_id: project_id, key_id: key_id});
```

#### Create project comments

```js
lokaliseApi.comments.create({
  'comments': [
    { comment: "Project comment 1" },
    { comment: "Project comment 2" }
  ]
}, { project_id: project_id, key_id: key_id});
```

#### Delete a comment

```js
lokaliseApi.comments.delete(comment_id, {project_id: project_id, key_id: key_id});
```

### Contributors

[Documentation](https://lokalise.co/api2docs/node/#object-contributors)

#### List project contributors

```js
lokaliseApi.contributors.list({project_id: project_id});
```

#### Get a contributor

```js
lokaliseApi.contributors.get(user_id, {project_id: project_id});
```

#### Create contributors

```js
lokaliseApi.contributors.create([
  {
    "email": "translator2@mycompany.com",
    "fullname": "Mr. Translator",
    "is_admin": false,
    "is_reviewer": true,
    "languages": [
      {
        "lang_iso": "en",
        "is_writable": false
      }
    ]
  }
], {project_id: project_id});
```

#### Update contributor

```js
lokaliseApi.contributors.update(
  user_id,
  {is_admin: true},
  {project_id: project_id}
);
```

#### Delete a contributor

```js
lokaliseApi.contributors.delete(user_id, {project_id: project_id});
```

### Files

[Documentation](https://lokalise.co/api2docs/node/#object-files)

#### List project files

```js
lokaliseApi.files.list({project_id: project_id});
```

#### Upload a file

```js
lokaliseApi.files.upload(project_id, {data: data_base64, filename: 'test1.json', lang_iso: 'en'})
```

#### Download a file

```js
lokaliseApi.files.download(project_id, {format: 'json', "original_filenames": true});
```

### Files

#### List project files

Params *page* and *limit* are optional.

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


#### Create keys

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

#### Update keys in bulk

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
lokaliseApi.keys.bulk_delete({
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

#### Create a language

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


#### Get a language

```
lokaliseApi.languages.get(<languageId>, { project_id: <projectId> });
```

#### Update a language

```
lokaliseApi.languages.update(<languageId>, {
          "lang_iso": "en-US",
          "plural_forms": [
              "one", "zero", "few", "other"
          ]
      }, {project_id: <projectId>});
```

#### Delete a language

```
lokaliseApi.languages.delete(<languageId>, { project_id: <projectId> });
```

### Orders

[Documentation](https://lokalise.co/api2docs/node/#object-orders)

#### List orders

```js
lokaliseApi.orders.list({team_id: team_id})
```

#### Retrieve order

```js
lokaliseApi.orders.get(order_id, {team_id: team_id})
```

#### Create order

```js
lokaliseApi.orders.create({
  project_id: '803xyz145ba90b42abc.46800',
  card_id: '1774',
  briefing: 'My briefing',
  source_language_iso: 'en',
  target_language_isos: ['nl'],
  keys: [12345],
  provider_slug: 'gengo',
  translation_tier: '1'
},
{team_id: team_id});
```

### Payment Cards

[Documentation](https://lokalise.co/api2docs/node/#object-payment-cards)

#### List payment cards

```js
lokaliseApi.paymentCards.list();
```

#### Retrieve payment card

```js
lokaliseApi.paymentCards.get(card_id);
```

#### Create payment card

```js
lokaliseApi.paymentCards.create({
  number: '4242424242424242',
  cvc: 123,
  exp_month: 10,
  exp_year: 2030
});
```

#### Delete payment card

```js
lokaliseApi.paymentCards.delete(card_id);
```

### Projects

[Documentation](https://lokalise.co/api2docs/node/#object-projects)

#### List projects

```js
lokaliseApi.projects.list();
```

#### Retrieve project

```js
lokaliseApi.projects.get(project_id)
```

#### Create project

```js
lokaliseApi.projects.create({ name: "Project name", description: "Project description" });
```

#### Update project

```js
lokaliseApi.projects.update(project_id, { name: "New name", description: "New description"});
```

#### Empty project

```js
lokaliseApi.projects.empty(project_id)
```

#### Delete project

```js
lokaliseApi.projects.delete(project_id);
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


#### Get a screenshot

```
lokaliseApi.screenshots.get(<screenshotId>, {project_id: <projectId>});
```

#### Update a screenshot

```
lokaliseApi.screenshots.update(<screenshotId>, {
    "key_ids": [
        1132290, 1132292
    ],
    "tags": [
        "main"
    ]
}, {project_id: <projectId>});
```

#### Delete a screenshot

```
lokaliseApi.screenshots.delete(<screenshotId>, { project_id: <projectId> });
```

### Snapshots

#### List snapshots

```
lokaliseApi.snapshots.list({project_id: <projectId>});
```

#### Create a snapshot

```
lokaliseApi.snapshots.create({ "title": "API snapshot" }, {project_id: <projectId>});
```

#### Restore a snapshot

```
lokaliseApi.snapshots.restore({ project_id: <projectId>, id: <snapshotId>});
```

#### Delete a snapshot

```
lokaliseApi.snapshots.delete({ project_id: <projectId>, id: <snapshotId>});
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

#### List all teams

```
lokaliseApi.teams.list({ page 1, limit: 10000 });
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
lokaliseApi.team_users.update(<teamUserId>, { "role": "admin" },
                        { project_id: <projectId> });
```

#### Delete a team user

```
lokaliseApi.team_users.delete(<teamUserId>, { project_id: <projectId> });
```

### Team user groups

#### List team user groups
```
lokaliseApi.user_groups.list({ team_id: <teamId> });
```

#### Create a team user group

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

#### Remove a project from a group 

```
lokaliseApi.user_groups.remove_project_from_group(<teamId>, <groupId>, {
                          "projects": [
                              "598901215bexxx43dcba74.xxx"
                          ]
                      });
```

### Translation Providers

[Documentation](https://lokalise.co/api2docs/node/#object-translation-providers)

#### List translation providers

```js
lokaliseApi.translationProviders.list({team_id: team_id})
```

#### Retrieve translation provider

```js
lokaliseApi.translationProviders.get(translation_provider_id, {team_id: team_id});
```

## Additional Info

### Error handling

[Error codes](https://lokalise.co/api2docs/node/#resource-errors) are listed in the API docs.

### API Rate Limits

Lokalise does not [rate-limit API requests](https://lokalise.co/api2docs/node/#resource-rate-limits), however retain a right to decline the service in case of excessive use. Only one concurrent request per token is allowed. To ensure data consistency, it is not recommended to access the same project simultaneously using multiple tokens.

## Running Tests

This library is tested with Node 8, 9, 10, 11, and 12. To test locally:

1. Copypaste `.env.example` file as `.env`. Put your API token inside. The `.env` file is excluded from version control so your token is safe. All in all, we use pre-recorded cassettes, so the actual API requests won't be sent. However, providing at least some token is required.
2 Run `npm test`. Observe test results and coverage.

## Building

1. Run `npm run-script build`
2. Browse `dist/` folder

## License

This library is licensed under the [MIT License](https://github.com/lokalise/node-lokalise-api/blob/master/LICENSE).

Copyright (c) [Lokalise team](http://lokalise.co), Roman Kutanov, [Ilya Bodrov](http://bodrovis.tech)
