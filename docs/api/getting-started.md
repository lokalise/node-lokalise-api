# Getting Started

## Installation and Requirements

**Please note that starting from version 9 this SDK is a pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. It does not provide a CommonJS export (`require`) anymore.** Therefore you should either [convert your project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), use [dynamic import](https://v8.dev/features/dynamic-import), or stay on [version 8](https://github.com/lokalise/node-lokalise-api/tree/v8) which we are fully supporting.

This library requires [Node 14](https://nodejs.org) and above. Install it with [NPM](https://www.npmjs.com/):

```bash
npm install @lokalise/node-api
```

## Initializing the Client

**[If you'd like to work with the OTA (over-the-air) endpoints, please refer to the OTA introduction article.](https://lokalise.github.io/node-lokalise-api/ota/introduction)**

In order to perform API requests, you need a special token that can be obtained in your [personal profile](https://lokalise.com/profile#apitokens) (*API tokens* section).

After you've obtained the token, initialize the client:

```js
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
```

Alternatively, you can use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow) (don't forget that these tokens have expiration dates):

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });
```

Now you can perform API requests, for example:

```js
const projects = await lokaliseApi.projects().list();
projects.items[0].name;
```

Every request returns a promise with a corresponding object (or array of objects) as the result.

All object attributes can be found in the [interfaces](https://github.com/lokalise/node-lokalise-api/tree/master/src/interfaces).

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

### Cursor pagination

The [List Keys](https://developers.lokalise.com/reference/list-all-keys) and [List Translations](https://developers.lokalise.com/reference/list-all-translations) endpoints support cursor pagination, which is recommended for its faster performance compared to traditional "offset" pagination. By default, "offset" pagination is used, so you must explicitly set `pagination` to `"cursor"` to use cursor pagination.

```js
// This approach is also applicable for `lokaliseApi.translations().list()`
const keys = await lokaliseApi.keys().list({
  project_id: projectId,
  limit: 2, // The number of items to fetch. Optional, default is 100
  pagination: "cursor",
  cursor: "eyIxIjo1MjcyNjU2MTd9", // The starting cursor. Optional, string
});

const key = keys.items[0]; // Accessing items as with regular pagination
```

After retrieving data from the Lokalise API, you can check for the availability of the next cursor and proceed accordingly:

```js
const hasNext = keys.hasNextCursor(); // Returns a boolean

const nextCursor = keys.nextCursor; // Returns the next cursor as a string, empty if unavailable

const keysNextPortion = await lokaliseApi.keys().list({
  project_id: projectId,
  limit: 2,
  pagination: "cursor",
  cursor: nextCursor,
});
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