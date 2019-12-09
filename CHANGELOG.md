# Lokalise API Node Client Changelog

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
