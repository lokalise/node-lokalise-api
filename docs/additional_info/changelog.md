# Changelog

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
