# Getting Started

## Installation and Requirements

This library requires [Node 10](https://nodejs.org) and above. Install it with [NPM](https://www.npmjs.com/):

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

Alternatively, you can use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow) (don't forget that these tokens have expiration dates):

```ts
const { LokaliseApiOAuth } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });
```

Now you can perform API requests, for example:

```js
const projects = lokaliseApi.projects().list();
projects.items[0].name;
```

Every request returns a promise with a corresponding object (or array of objects) as the result. Please note that Lokalise API locks parallel requests which means you should call methods in a synchronous manner.

All object attributes may be found in the [interfaces](https://github.com/lokalise/node-lokalise-api/tree/master/src/interfaces).

## Pagination

Bulk fetches support [pagination](https://app.lokalise.com/api2docs/curl/#resource-pagination). There are two common parameters available:

* `limit` (defaults to `100`, maximum is `5000`) &mdash; number of records to display per page
* `page` (defaults  to `1`) &mdash; page to fetch

For instance:

```js
const projects = lokaliseApi.projects().list({page: 2, limit: 10});
```

The response pagination data can be fetched in the following way:

```js
projects.totalResults; // => 30
projects.totalPages; // => 3
projects.resultsPerPage; // => 10
projects.currentPage; // => 2
```

You can also utilize the following functions:

```js
projects.hasNextPage(); // => true
projects.hasPrevPage(); // => true
projects.isLastPage(); // => false
projects.isFirstPage(); // => false
projects.nextPage(); // => 3
projects.prevPage(); // => 1
```

**Please note** that in order to get the actual data from the paginated response, you have to use the `.items` attribute:

```js
// CORRECT:
const project = projects.items[0]; // .items will fetch all projects data and [0] will get the first project
project.name

// INCORRECT:
const project = projects[0];
project.name
```

## Branching

If you are using [project branching feature](https://docs.lokalise.com/en/articles/3391861-project-branching), simply add branch name separated by semicolon to your project ID in any endpoint to access the branch. For example, in order to access `new-feature` branch for the project with an id `123abcdef.01`:

```js
lokaliseApi.files().list({project_id: '123abcdef.01:new-feature'});
```

## Compression

Lokalise API supports gzip compression. By default it's turned off but you can enable it by setting the `enableCompression` option:

```js
new LokaliseApi({ apiKey: "123abc", enableCompression: true })
```

 When this option is set to `true`, it will add an `Accept-Encoding=gzip,deflate` header to the request. It can be very useful when requesting a large amount of data.