# Changelog

## 7.3.0 (07-Jun-2022)

* Various code improvements
* Updated dependencies
* Test with more recent Node versions

## 7.2.0 (08-Mar-2022)

* **New feature**: ability to request and refresh OAuth 2 tokens:

```ts
const { LokaliseAuth } = require('@lokalise/node-api');

// Provide your client id and client secret
const lokaliseAuth = new LokaliseAuth("client id", "client secret");

// Generate an authentication url
const url = lokaliseAuth.auth(
  ["read_projects", "write_team_groups"],
  "http://example.com/redirect",
  "random123"
);

// Generate an authentication and refresh tokens
const response = await lokaliseAuth.token("secret code");
const token = response["access_token"];
const refresh_token = response["refresh_token"];

// Refresh an access token once it expires
const new_token = await lokaliseAuth.refresh(refresh_token)["access_token"];

// Perform requests on the user's behalf
const { LokaliseApiOAuth } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApiOAuth({ apiKey: new_token });

const projects = lokaliseApi.projects().list();
```

* Various code fixes and improvements
* Minor docs update

## 7.1.1 (21-Feb-2022)

* Updated certain types (thanks, @arelstone) 

## 7.1.0 (17-Dec-2021)

* Added support for the [`TeamUserBillingDetails` endpoint](https://lokalise.github.io/node-lokalise-api/api/team-user-billing-details)
* Added support for the [`Segments` endpoint](https://lokalise.github.io/node-lokalise-api/api/segments)
* Minor code updates

## 7.0.1 (10-Nov-2021)

* Fixed `language_mapping ` for `DownloadFileParams` (thanks, @dhensby)
* Test with Node 17; remove Node 11 from test matrix (EOL)

## 7.0.0 (25-Oct-2021)

* **Breaking change**. We have refactored the code to make it more robust and have slightly changed the way you access endpoints. Previously you were writing:

```ts
lokaliseApi.comments.list_project_comments()

lokaliseApi.files.upload()
```

* Now, however, all the endpoints are methods, therefore you must add round brackets after their names, for example:

```ts
lokaliseApi.comments().list_project_comments() // .comments(), not .comments

lokaliseApi.files().upload() // .files(), not .files
```

* You can simply use search-replace functionality to automatically fix all these issues in your code.
* **New feature**. You can now use [OAuth2](https://docs.lokalise.com/en/articles/5574713-oauth-2) tokens with this client. To achieve that, simply employ the `LokaliseApiOAuth` class:

```ts
const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });

const projects = lokaliseApi.projects().list();
```

* The endpoints should be called in the same way.

## 6.3.0 (15-Jul-21)

* Added `enableCompression` option: `new LokaliseApi({ apiKey: "123abc", enableCompression: true })`. The default value for this option is `false`. When set to `true`, it will add an `Accept-Encoding=gzip,deflate` header to the request. It can be very useful when requesting a large amount of data.

## 6.2.2 (13-Jul-21)

* Fix `UploadFileParams` interface to comply with the API params

## 6.2.1 (18-May-21)

* Test with Node 16
* Do not test with Node 10 that has reached its EOL
* Move `typescript` to `devDependencies` (thanks, @omonk)

## 6.2.0 (28-Apr-21)

* Added `task_id` for `Translation`
* Dependency updates

## 6.1.0 (26-Feb-21)

* Added `payment_method` field (`string`) for the `Order`
* Fixed typing for the `ApiRequest` (thanks, @Tenga)
* Updated to ESLintConfigPrettier 8

## 6.0.0 (02-Feb-21)

This is a major release that contains quite a lot of changes mostly aimed towards pagination and typings system. Also the docs were updated, and various fixes were introduced.

**Breaking change**: pagination data is now attached directly to the collection returned by the request. Previously the following code was not working because pagination was stored in a separate object unrelated to the collection:

```js
const projects = lokaliseApi.projects.list({team_id: team_id, page: 2, limit: 10});
projects.totalResults; // => undefined
```

Therefore, you had to do the following inconvenient trick (for example, see [#53](https://github.com/lokalise/node-lokalise-api/issues/53)):

```js
lokaliseApi.projects.list().totalResults;
```

**This is not the case anymore**! Paginated collections now have the following attributes and functions:

```js
projects.totalResults; // => 30
projects.totalPages; // => 3
projects.resultsPerPage; // => 10
projects.currentPage; // => 2
projects.hasNextPage(); // => true
projects.hasPrevPage(); // => true
projects.isLastPage(); // => false
projects.isFirstPage(); // => false
projects.nextPage(); // => 3
projects.prevPage(); // => 1
```

However **to get the actual data from the paginated response**, you must use the `.items` attribute now:

```js
const projects = lokaliseApi.projects.list({team_id: team_id, page: 2, limit: 10});

// CORRECT:
const project = projects.items[0]; // .items will fetch all projects data and [0] will get the first project
project.name

// INCORRECT:
const project = projects[0]; // this will not work anymore!
project.name

// And pagination can be fetched in the following way:
projects.totalResults; // => 30
projects.hasNextPage(); // => true
```

**Breaking change**: potential errors returned by the API when performing bulk create or bulk update operations are not swallowed anymore. For example, Lokalise APIv2 allows to create translation keys in bulk. If one of the key names is already taken, it won't be created and the corresponding error message will be added to the `errors` response attribute. However, the whole operation will *not* fail and all other valid keys will still be created. The response has the following structure:

```js
{
    "project_id": "300abc.877xyz",
    "keys": [
      // keys that were successfully created
    ],
    "errors": [
        {
            "message": "This key name is already taken",
            "code": 400,
            "key": {
                "key_name": "button.ok" // this key name cannot be created because of the duplicating name
            }
        }
    ]
}
```

Previously such errors were silently swallowed, however that's not the case anymore. Specifically, changes were made to the following methods:

* `keys.create`
* `keys.bulk_update` (note that `keys.update` is unaffected by this change)
* `languages.create`
* `screenshots.create`

**To fetch the actual data returned by these methods** you now have to use the `.items` attribute. **To fetch the errors**, use `.errors`:

```js
const keys = await lokaliseApi.keys.create(
  [
    {
      key_name: "valid.key.name",
      platforms: ["web"],
      filenames: { web: "%LANG_ISO%.yml", },
      translations: [
        {
          language_iso: "en",
          translation: "Valid key",
        },
      ],
    },
    {
      key_name: "duplicate.key",
      platforms: ["web"],
      translations: [
        {
          language_iso: "en",
          translation: "Duplicate!",
        },
      ],
    },
  ],
  { project_id: '123.abc' }
);

keys.errors[0].message // => "This key name is already taken" -- this key was not created
keys.items[0].key_name.ios // => "valid.key.name" -- this key was created
```

**Update**: added `auto_close_items` boolean attribute for `Task`.

## 5.3.0 (24-Nov-20)

* Add `use_automations` flag to `UploadFileParams` (default is `true`)
* Update dependencies
* Test against Node 15

## 5.2.2 (09-Nov-20)

* Update lodash to the latest version

## 5.2.1 (03-Nov-20)

* Update dependencies

## 5.2.0 (02-Oct-20)

* Provide missing typings
* Added `source_language_iso` for the `Task`

## 5.1.0 (09-Sep-20)

* Update all dependencies
* The library's license is now BSD 3 Clause

## 5.0.0 (08-Jul-20)

* Added all recently introduced attributes for the following endpoints: `Key` and `File`.
* API now supports only background file uploads, and the `queue` parameter doesn't have any effect anymore. Therefore, removed all code and docs related to sync uploading.
* Parameters required by the API are now enforced by the client as well.
* Updated the `merge` method for the `Branches` endpoint. It now accepts the branch ID to merge, the project ID and the optional list of additional parameters:

```js
lokaliseApi.branches.merge(34567,
  {project_id: '123.abc'},
  {"force_conflict_resolve_using": "master"}
)
```

## 4.0.1 (16-Jun-20)

* Update all dependencies to recent versions
* Update linters

## 4.0.0 (18-May-20)

* **Breaking change** [All translation files are now uploaded in the background](https://github.com/lokalise/node-lokalise-api#upload-a-file). A `QueuedProcess` with the job status will be returned as a result. Synchronous uploading is still supported by the API but will be removed in the near future (use version 3 to upload synchronously).
* Added support for [`QueuedProcess` endpoint](https://app.lokalise.com/api2docs/curl/#resource-queued-processes)
* Test against Node 14
* Fix `webhook_id` type for `Webhooks` endpoint
* Added linter

## 3.0.3 (22-Apr-20)

* Updated for Got 11
* Updated some other dependencies
* Set stricter compiler options

## 3.0.0 (27-Mar-20)

* **Dropped support for Node < 10**
* Added custom statuses-related params to `UploadFileParams`
* Use own [mocha-cassettes](https://github.com/bodrovis/mocha-cassettes) solution to record HTTP interactions
* Replace [request](https://github.com/request/request) (which is not longer maintained) with [got](https://github.com/sindresorhus/got)
* Update all dependencies to the latest versions

## 2.1.0 (28-Feb-20)

* Added method to [regenerate webhook secret](https://lokalise.com/api2docs/curl/#transition-regenerate-a-webhook-secret-patch): `lokaliseApi.webhooks.regenerate_secret(webhook_id, {project_id: project_id});`

## 2.0.2 (25-Feb-20)

* Pagination data can now be fetched using the following methods: `totalResults`, `totalPages`, `resultsPerPage`, `currentPage`

## 2.0.1 (09-Dec-19)

* Fixed file download params

## 2.0.0 (05-Dec-19)

* Added [error handling mechanism](https://github.com/lokalise/node-lokalise-api#error-handling)
* Updated dependencies

## 1.5.0-rc.1 (04-Dec-19)

* Set `noImplicitAny` and `strictNullChecks` to `true` in `tsconfig.json`
* Fixed errors related to the options above

## 1.4.0 (13-Nov-19)

* Added `merge` method for the branches endpoint allowing to [perform merges](https://lokalise.com/api2docs/curl/#transition-merge-a-branch-post)

## 1.3.0 (30-Oct-19)

* Added support for [`Branch` endpoint](https://lokalise.com/api2docs/curl/#resource-branches)
* Test against Node 13
* Update dependencies

## 1.2.0 (20-Aug-19)

* Added support for [`Webhook` endpoint](https://lokalise.co/api2docs/curl/#resource-webhooks)

## 1.1.0 (18-Jul-19)

* Incorporate new API changes
* Added support for [`TranslationStatus` endpoint](https://lokalise.co/api2docs/curl/#resource-translation-statuses)

## 1.0.1 (12-07-19)

* Updated dependencies

## 1.0.0 (20-06-19)

**Note that this version is a major re-write and has API breaking changes! Check documentation for the specific endpoint to learn more.**

* Fixed various bugs, make API calls more convenient
* Updated interfaces to match API changes
* Updated typings
* Added new endpoints: `TranslationProvider`, `Order`, `PaymentCard`
* Added tests for all endpoints
* Added test coverage
* Added Travis

## 0.0.9 (07-06-19)

* Updated dependencies
* Create typings
* Fixed docs

## 0.0.4

* Fixed mismatch between the documentation and code. The API is initialized now as stated in the documentation.
