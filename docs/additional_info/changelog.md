# Changelog

## 13.0.0

* Reworked code, make types stricter and error handling better
* Allow to provide request timeout:

```js
const client = new LokaliseApi({
  apiKey: "API_KEY",
  requestTimeout: 5e3, // the value is in milliseconds
});

try {
  await client.projects().list();
} catch (e) {
  console.error(e);
  console.log(e.message); // "Request timed out after 1000ms"
  console.log(e.code); // 408
  console.log(e.details); // { reason: "timeout" }
}
```

## 12.8.0 (15-Oct-2024)

* Added support for a new [`PermissionTemplates` endpoint](https://developers.lokalise.com/reference/list-all-permission-templates):

```js
const roles = await lokaliseApi.permissionTemplates().list({
  team_id: teamId,
});

const roleDetails = roles.items[0];

roleDetails.id // => 1
roleDetails.role // => "Manager"
roleDetails.tag // => "Full access"
```

* Added `role_id` attribute to the user group object. For example:

```js
const user_group = await lokaliseApi.userGroups().get(groupId, {
  team_id: teamId,
});

user_group.role_id; // => 5
```

* Added `role_id` attribute to the contributor object. For example:

```js
const contributor = await lokaliseApi.contributors().get(userId, {
  project_id: projectId,
});

contributor.role_id; // => 5
```

* Migrate from eslint to biome
* Use tsup for compilation

## 12.7.0 (17-Jul-2024)

* Added `tm_leverage` field for the `languages` of the `Task` object:

```js
const task = await lokaliseApi.tasks().get(taskId, {
  project_id: projectId,
});

const language = task.languages[0];
language.tm_leverage.status; // => "completed"
language.tm_leverage.value["50%+"]; // => 31
```

* Available values for the `tm_leverage` are "0%+", "50%+", "75%+", "85%+", "95%+", and "100%". Please note that the usage of `initial_tm_leverage` is deprecated.

## 12.6.0 (01-Jul-2024)

* Added `ai_words` parameter under the `quota_usage` and `quota_allowed` field of the `Team` object:

```js
const teams = await lokaliseApi.teams().list();
const team = teams.items[0];

team.quota_allowed.ai_words // => 4000
team.quota_usage.ai_words // => 1234
```

## 12.5.0 (14-May-2024)

* Add support for [cursor pagination](https://lokalise.github.io/node-lokalise-api/api/getting-started#cursor-pagination) for List keys and List translation endpoints:

```js
// This approach is also applicable for `lokaliseApi.translations().list()`
const keys = await lokaliseApi.keys().list({
  project_id: projectId,
  limit: 2, // The number of items to fetch. Optional, default is 100
  pagination: "cursor",
  cursor: "eyIxIjo1MjcyNjU2MTd9", // The starting cursor. Optional, string
});

const key = keys.items[0]; // Accessing items as with regular pagination

const hasNext = keys.hasNextCursor(); // Returns a boolean

const nextCursor = keys.nextCursor; // Returns the next cursor as a string, empty if unavailable

const keysNextPortion = await lokaliseApi.keys().list({
  project_id: projectId,
  limit: 2,
  pagination: "cursor",
  cursor: nextCursor,
});
```

## 12.4.1 (24-Apr-2024)

* Add a new `WebhookProjectTranslationsProofread` webhook event type [according to the documentation](https://developers.lokalise.com/docs/webhook-events#projecttranslationsproofread)

## 12.4.0 (25-Mar-2024)

* Enhance typings, export more types, various fixes

## 12.3.0 (19-Mar-2024)

* Our SDK now exports types for [webhook events](https://lokalise.github.io/node-lokalise-api/additional_info/webhook_events).

## 12.2.1 (13-Mar-2024)

* Expose more types

## 12.2.0 (13-Mar-2024)

* Properly handle cases when the server response cannot be parsed (which usually happens when the error 429 is encountered)

## 12.1.0 (05-Dec-2023)

* Minor code updates
* Use Vitest for testing

## 12.0.0 (23-Sep-2023)

* This SDK now does not have any third-party runtime dependencies. Previously we used Got to send HTTP requests but this solution caused issues with typings for some customers therefore we decided to utilize the native Fetch API instead. The only issue is that Fetch API is a relatively new feature therefore Node 18+ is required.
* Fixed certain types, make code more robust.
* Fully rewrite tests, use stubs instead of cassettes.
* Test only with Node 18+.

## 11.1.0 (19-Sep-2023)

* Revert to Got 12 as the newer version causes issues with types. We will probably switch to the Fetch API in one on the next major releases.

## 11.0.1 (23-Aug-2023)

* Fix certain edge cases for OTA endpoints when the body is not present

## 11.0.0 (23-Aug-2023)

* Added support for the OTA endpoints. Please refer to the [OTA introduction article](https://lokalise.github.io/node-lokalise-api/ota/introduction) to learn more.

## 10.0.0 (5-Jul-2023)

* Require Node 16+ (version 14 has reached EOL)
* Update to Got 13

## 9.8.1 (23-May-2023)

* Added a missing `close_language` attribute to `languages` of `UpdateTaskParams` (thanks, @FelixGraf)

## 8.5.1 (23-May-2023)

* Added a missing `close_language` attribute to `languages` of `UpdateTaskParams` (thanks, @FelixGraf)
* Test with Node 20

## 9.8.0 (29-Mar-2023)

* Added `compact` attribute to `FileDownloadParams` interface
* Do not mutate params (thanks, @vlinder)

## 8.5.0 (29-Mar-2023)

* Added `compact` attribute to `FileDownloadParams` interface

## 9.7.0 (16-Mar-2023)

* Use TypeScript 5
* Fix incorrect types for bulk key update (thanks, @ZoidC)

## 8.4.0 (16-Mar-2023)

* Use TypeScript 5
* Fix incorrect types for bulk key update (thanks, @ZoidC)

## 9.6.1 (02-Mar-2023)

* Stricter types
* Remove redudant dependencies

## 9.6.0 (28-Jan-2023)

* Download and upload params (`DownloadFileParams` and `UploadFileParams`) are stricter now and accept only the values that are actually supported by the API.

## 8.3.0 (28-Jan-2023)

* Download and upload params (`DownloadFileParams` and `UploadFileParams`) are stricter now and accept only the values that are actually supported by the API.

## 9.5.0 (11-Jan-2023)

* Replaced `jwt().get()` with `jwt().create()`. The `create()` method accepts a mandatory `project_id` parameter:

```js
const response = await lokaliseApi.jwt().create("1234.abcd");

response.jwt // => "eyJ0eXAiOiJKV1QiLCJhbG..."
```

## 9.4.0 (30-Dec-2022)

* Various refactorings to add support for Deno (check the issue [#350](https://github.com/lokalise/node-lokalise-api/issues/350))
* Use c8 for test coverages
* Other minor updates

## 9.3.0 (30-Nov-2022)

* Added support for the [JWT endpoint](https://developers.lokalise.com/reference/get-ota-jwt). You can now request tokens to work with OTA:

```js
const response = await lokaliseApi.jwt().get();

response.jwt // => "eyJ0eXAiOiJKV1QiLCJhbG"
```

* Tested with Node 19

## 9.2.0 (20-Oct-2022)

* We are sunsetting the Upvoting feature and thus the `upvoting` attribute from the `settings` object was removed from the response body of the following endpoints:
  + List all projects
  + Create a project
  + Retrieve a project
  + Update a project
  + Restore a snapshot

## 9.1.0 (13-Oct-2022)

* Export new interfaces and types, specifically `KeyParamsWithPagination`, `CreateKeyData`, and others.

## 9.0.0 (05-Oct-2022)

* **Breaking change**: this SDK is now a pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. What does it mean? It no longer provides a CommonJS export (in other words, no `require` anymore). What can you do about it?
  + [Convert your project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) — this is actually the preferred way
  + [Use dynamic import](https://v8.dev/features/dynamic-import)
  + Do nothing and stay on [version 8](https://github.com/lokalise/node-lokalise-api/tree/v8). We're planning to continue supporting it in the future.
* **Breaking change**: the minimum required Node version is 14.

## 8.2.0 (20-Oct-2022)

* We are sunsetting the Upvoting feature and thus the `upvoting` attribute from the `settings` object was removed from the response body of the following endpoints:
  + List all projects
  + Create a project
  + Retrieve a project
  + Update a project
  + Restore a snapshot

## 8.1.0 (13-Oct-2022)

* Export `KeyParamsWithPagination` interfaces

## 8.0.2 (03-Oct-2022)

* Properly export common interfaces like `ApiError`, `Comment`, `File`, and so on. For example, now you can say:

```js
// We can import the Contributor interface easily:
import { LokaliseApi, Contributor } from '@lokalise/node-api';

const lokaliseApi = new LokaliseApi({ apiKey: '123xyz' });

const contributors = await lokaliseApi.contributors().create([
  {
    // ...
  }
], { project_id: '123.abc' });

const contributor: Contributor = contributors[0];
console.log(contributor.email, contributor.user_id);
```

* Added `RequestTokenResponse` and `RefreshTokenResponse` interfaces:

```js
import {
  RequestTokenResponse,
  RefreshTokenResponse,
  LokaliseAuth
} from '@lokalise/node-api';

const lokaliseAuth = new LokaliseAuth("123abc", "456zyx");

const token_resp: RequestTokenResponse = await lokaliseAuth.token("secret_code");

const refresh_resp: RefreshTokenResponse = await lokaliseAuth.refresh("refresh_token");
```

* Update dependencies.

## 8.0.1 (01-Sep-2022)

* Fix dependencies issues

## 8.0.0 (01-Aug-2022)

* **Breaking change!** Fixed a bug for `keys().create()` when `use_automations` param was ignored. **Please note** that now keys have to be created in a slightly different way:

```js
const keys = await lokaliseApi.keys().create(
  {
    keys: [
      {
        key_name: "welcome_web",
        description: "Index app welcome",
        platforms: ["web"],
        filenames: {
          web: "my_filename.json",
        },
        translations: [
          {
            language_iso: "en",
            translation: "Welcome",
          },
        ],
      },
      {
        key_name: "welcome_ios",
        description: "Welcome apple",
        platforms: ["ios"],
        is_plural: true,
        translations: [
          {
            language_iso: "en",
            translation: {
              one: "I have one apple",
              other: "I have a lot of apples",
            },
          },
        ],
      },
    ],
  },
  { project_id: project_id }
);


// Per-platform key names:

const keys = await lokaliseApi.keys().create(
  {
    keys: [
      {
        key_name: {
          ios: "name_for_ios",
          web: "name_for_web",
          android: "android_name",
          other: "other_name",
        },
        platforms: ["web", "ios"],
        translations: [
          {
            language_iso: "en",
            translation: "Per-platform key names",
          },
        ],
      },
    ],
  },
  { project_id: project_id }
);
```

* Same applies to bulk update:

```js
const keys = await lokaliseApi.keys().bulk_update(
  {
    keys: [
      {
        key_id: key_id,
        description: "Bulk node",
        platforms: ["web"],
      },
      {
        key_id: second_key_id,
        description: "Second bulk",
      },
    ],
  },
  { project_id: project_id }
);
```

* **New feature**: ability to provide API host when instantiating a client. Default hosts are `"https://api.lokalise.com/api2/"` (for API endpoints) and `"https://app.lokalise.com/oauth2/"` (for OAauth 2 flow) but you can override these by providing an optional `host` param:

```ts
const client = new LokaliseApi({
  apiKey: "123abc",
  host: "https://custom.example.com/api2/",
});
```

* Reworked typings system
* Various fixes and enhancements

## 7.3.1 (07-Jun-2022)

* Minor fixes

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
