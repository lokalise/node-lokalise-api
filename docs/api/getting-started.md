# Getting Started

## Installation and Requirements

This library requires Node 10 and above. Install it with [NPM](https://www.npmjs.com/):

```bash
npm install @lokalise/node-api
```

## Initializing the Client

In order to perform API requests, you require a special token that can be obtained in your [personal profile](https://lokalise.com/profile#apitokens) (*API tokens* section).

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

Every request returns a promise with a corresponding object (or array of objects) as the result. Please note that Lokalise API locks parallel requests which means you should call methods in a synchronous manner.

All object attributes may be found in the [interfaces](https://github.com/lokalise/node-lokalise-api/tree/master/src/interfaces).

## Pagination

Bulk fetches support [pagination](https://app.lokalise.com/api2docs/curl/#resource-pagination). There are two common parameters available:

* `limit` (defaults to `100`, maximum is `5000`) - number of records to display per page
* `page` (defaults  to `1`) - page to fetch

For instance:

```js
lokaliseApi.translationProviders.list({team_id: team_id, page: 2, limit: 10});
```

The response pagination data can be fetched in the following way:

```js
lokaliseApi.projects.totalResults;
lokaliseApi.projects.totalPages;
lokaliseApi.projects.resultsPerPage;
lokaliseApi.projects.currentPage;
```

## Branching

If you are using [project branching feature](https://docs.lokalise.com/en/articles/3391861-project-branching), simply add branch name separated by semicolon to your project ID in any endpoint to access the branch. For example, in order to access `new-feature` branch for the project with an id `123abcdef.01`:

```js
lokaliseApi.files.list({project_id: '123abcdef.01:new-feature'});
```
