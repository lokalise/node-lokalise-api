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
  + [Orders](#orders)
  + [Payment cards](#payment-cards)
  + [Projects](#projects)
  + [Screenshots](#screenshots)
  + [Snapshots](#snapshots)
  + [Tasks](#tasks)
  + [Teams](#teams)
  + [Team users](#team-users)
  + [Team user groups](#team-user-groups)
  + [Translations](#translations)
  + [Translation Providers](#translation-providers)
  + [Translation Statuses](#translation-statuses)
  + [Webhooks](#webhooks)
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

### Keys

[Documentation](https://lokalise.co/api2docs/node/#object-keys)

#### List keys

```js
lokaliseApi.keys.list({project_id: project_id});
```

#### Retrieve key

```js
lokaliseApi.keys.get(key_id, {project_id: project_id});
```

#### Create keys

```js
lokaliseApi.keys.create([
  {
    "key_name": "welcome_web",
    "description": "Index app welcome",
    "platforms": ["web"],
    "translations": [
      {
        "language_iso": "en",
        "translation": "Welcome"
      }
    ]
  },
  {
    "key_name": "welcome_ios",
    "description": "Welcome apple",
    "platforms": ["ios"],
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
  }
], {project_id: project_id});
```

#### Update a key

```js
lokaliseApi.keys.update(key_id, {
  "platforms": ["web", "other"],
  "description": "Node updated"
}, { project_id: project_id });
```

#### Update keys in bulk

```js
lokaliseApi.keys.bulk_update([
  {
    "key_id": key_id,
    "description": "Bulk node",
    "platforms": ["web"]
  },
  {
    "key_id": second_key_id,
    "description": "Second bulk",
  }
], { project_id: project_id});
```

#### Delete a key

```js
lokaliseApi.keys.delete(key_id, { project_id: project_id });
```

#### Delete multiple keys

```js
lokaliseApi.keys.bulk_delete([
  key_id, second_key_id
], { project_id: project_id });
```

### Languages

[Documentation](https://lokalise.co/api2docs/node/#object-languages)

#### List system languages

```js
lokaliseApi.languages.system_languages();
```

#### List project languages

```js
lokaliseApi.languages.list({project_id: project_id});
```

#### Retrieve a language

```js
lokaliseApi.languages.get(lang_id, {project_id: project_id});
```

#### Create languages

```js
lokaliseApi.languages.create([
  {
    "lang_iso": "ak"
  }
], { project_id: project_id });
```

#### Update a language

```js
lokaliseApi.languages.update(lang_id, {
  "lang_name": "Chinese Traditional Custom"
}, { project_id: project_id });
```

#### Delete a language

```js
lokaliseApi.languages.delete(lang_id, { project_id: project_id });
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

[Documentation](https://lokalise.co/api2docs/node/#object-screenshots)

#### List screenshots

```js
lokaliseApi.screenshots.list({project_id: project_id});
```

#### Retrieve screenshot

```js
lokaliseApi.screenshots.get(screenshot_id, {project_id: project_id});
```

#### Create screenshots

```js
lokaliseApi.screenshots.create([
  {
    data: data,
    "ocr": false,
    "key_ids": [key_id],
    "tags": ["onboarding"]
  }
],{project_id: project_id});
```

#### Update a screenshot

```js
lokaliseApi.screenshots.update(screenshot_id,
  {title: 'node screen', description: 'node desc'},
  {project_id: project_id}
);
```

#### Delete a screenshot

```js
lokaliseApi.screenshots.delete(screenshot_id, {project_id: project_id});
```

### Snapshots

[Documentation](https://lokalise.co/api2docs/node/#object-snapshots)

#### List snapshots

```js
lokaliseApi.snapshots.list({project_id: project_id});
```

#### Create a snapshot

```js
lokaliseApi.snapshots.create({"title": "API snapshot"}, {project_id: project_id});
```

#### Restore a snapshot

```js
lokaliseApi.snapshots.restore(snapshot_id, {project_id: project_id});
```

#### Delete a snapshot

```js
lokaliseApi.snapshots.delete(snapshot_id, {project_id: project_id});
```

### Tasks

[Documentation](https://lokalise.co/api2docs/node/#object-tasks)

#### List tasks

```js
lokaliseApi.tasks.list({project_id: project_id});
```

#### Retrieve task

```js
lokaliseApi.tasks.get(task_id, {project_id: project_id});
```

#### Create a task

```js
lokaliseApi.tasks.create({
  title: 'node task',
  keys: [key1, key2],
  languages: [
    {
      "language_iso": "en",
      "users": [user1, user2]
    }
  ]
}, {project_id: project_id});
```

#### Update a task

```js
lokaliseApi.tasks.update(
  task_id,
  {title: 'node updated'},
  {project_id: project_id}
);
```

#### Delete a task

```js
lokaliseApi.tasks.delete(task_id, {project_id: project_id});
```

### Teams

[Documentation](https://lokalise.co/api2docs/node/#object-teams)

#### List all teams

```js
lokaliseApi.teams.list();
```

### Team users

[Documentation](https://lokalise.co/api2docs/node/#object-team-users)

#### List team users

```js
lokaliseApi.teamUsers.list({team_id: team_id});
```

#### Retrieve a team user

```js
lokaliseApi.teamUsers.get(user_id, {team_id: team_id});
```

#### Update a team user

```js
lokaliseApi.teamUsers.update(
  user_id,
  {role: 'admin'},
  {team_id: team_id}
);
```

#### Delete a team user

```js
lokaliseApi.teamUsers.delete(user_id, {team_id: team_id});
```

### Team user groups

[Documentation](https://lokalise.co/api2docs/node/#object-team-user-groups)

#### List team user groups

```js
lokaliseApi.userGroups.list({team_id: team_id});
```

#### Retrieve team user group

```js
lokaliseApi.userGroups.get(group_id, {team_id: team_id});
```

#### Create a team user group

```js
lokaliseApi.userGroups.create(
  {
    name: 'Node',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);
```

#### Update team user group

```js
lokaliseApi.userGroups.update(
  group_id,
  {
    name: 'Node updated',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);
```

#### Add projects to a group

```js
lokaliseApi.userGroups.add_projects_to_group(
  team_id,
  group_id,
  [project_id]
);
```

#### Remove projects from a group 

```js
lokaliseApi.userGroups.remove_projects_from_group(
  team_id,
  group_id,
  [project_id]
);
```

#### Add users to a group

```js
lokaliseApi.userGroups.add_members_to_group(
  team_id,
  group_id,
  [user_id]
);
```

#### Remove users from a group

```js
lokaliseApi.userGroups.remove_members_from_group(
  team_id,
  group_id,
  [user_id]
);
```

#### Delete group

```js
lokaliseApi.userGroups.delete(new_group_id, {team_id: team_id});
```

### Translations

[Documentation](https://lokalise.co/api2docs/node/#object-translations)

#### List translations

```js
lokaliseApi.translations.list({project_id: project_id});
```

#### Retrieve translation

```js
lokaliseApi.translations.get(translation_id, {project_id: project_id});
```

#### Update translation

```js
lokaliseApi.translations.update(
  translation_id,
  {translation: 'updated'},
  {project_id: project_id}
);
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

### Translation Statuses

[Documentation](https://lokalise.co/api2docs/node/#resource-translation-statuses)

#### List translation statuses

```js
lokaliseApi.translationStatuses.list({project_id: project_id});
```

#### Retrieve translation status

```js
lokaliseApi.translationStatuses.get(status_id, {project_id: project_id});
```

#### Create translation status

```js
lokaliseApi.translationStatuses.create(
    {title: 'my status', color: '#344563'},
    {project_id: project_id}
 );
```

#### Update translation status

```js
lokaliseApi.translationStatuses.update(
    status_id,
    {title: 'my status updated', color: '#f2d600'},
    {project_id: project_id}
 );
```

#### Delete translation status

```js
lokaliseApi.translationStatuses.delete(status_id, {project_id: project_id});
```

#### Retrieve available colors for translation statuses

```js
lokaliseApi.translationStatuses.available_colors({project_id: project_id});
```

### Webhooks

[Documentation](https://lokalise.co/api2docs/node/#resource-webhooks)

#### List webhooks

```js
lokaliseApi.webhooks.list({project_id: project_id});
```

#### Retrieve webhook

```js
lokaliseApi.webhooks.get(webhook_id, {project_id: project_id});
```

#### Create webhook

```js
lokaliseApi.webhooks.create(
  {url: 'https://example.com', events: ['project.exported']},
  {project_id: project_id}
);
```

#### Update webhook

```js
lokaliseApi.webhooks.update(
  webhook_id,
  {url: 'http://example.com', events: ['project.snapshot']},
  {project_id: project_id}
);
```

#### Delete webhook

```js
lokaliseApi.webhooks.delete(
  webhook_id,
  {project_id: project_id}
);
```

## Additional Info

### Error handling

[Error codes](https://lokalise.co/api2docs/node/#resource-errors) are listed in the API docs.

### API Rate Limits

Lokalise does not [rate-limit API requests](https://lokalise.co/api2docs/node/#resource-rate-limits), however retain a right to decline the service in case of excessive use. Only one concurrent request per token is allowed. To ensure data consistency, it is not recommended to access the same project simultaneously using multiple tokens.

## Running Tests

This library is tested with Node 8, 9, 10, 11, and 12. To test it locally:

1. Copypaste `.env.example` file as `.env`. Put your API token inside. The `.env` file is excluded from version control so your token is safe. All in all, we use pre-recorded cassettes, so the actual API requests won't be sent. However, providing at least some token is required.
2. Run `npm test`. Observe test results and coverage.

## Building

1. Run `npm run-script build`
2. Browse `dist/` folder

## License

This library is licensed under the [MIT License](https://github.com/lokalise/node-lokalise-api/blob/master/LICENSE).

Copyright (c) [Lokalise team](http://lokalise.co), Roman Kutanov, [Ilya Bodrov](http://bodrovis.tech)
