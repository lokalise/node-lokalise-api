# Lokalise Node.js SDK

![npm](https://img.shields.io/npm/v/@lokalise/node-api)
![CI](https://github.com/lokalise/node-lokalise-api/actions/workflows/ci.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/lokalise/node-lokalise-api/badge.svg?branch=master)](https://coveralls.io/github/lokalise/node-lokalise-api?branch=master)
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

Official Node.js SDK for the Lokalise Expert and Vantage APIs.
- **Expert API:** Manage projects, translations, files, tasks, and other resources. See the [Expert API reference](https://developers.lokalise.com/reference/lokalise-rest-api).
- **Vantage API:** Manage projects, content, uploads, imports, exports, and translation workflows. See the [Vantage API reference](https://developers.lokalise.com/reference/lokalise-vantage-api-introduction).

> Looking for a simple way to upload and download translations in Lokalise Expert? Try [lokalise-file-exchange](https://github.com/bodrovis/lokalise-node-file-exchange).

## Quickstart

Install the package:

```bash
npm install @lokalise/node-api
```

[Get a Lokalise API token from your personal profile](https://docs.lokalise.com/en/articles/1929556-api-and-ota-tokens#h_9ea8e7ff3c), then initialize the client for the API you want to use.

### Expert API

Use `LokaliseApi` to work with Expert projects, translations, files, and other resources.

```ts
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: "<apiKey>" });

// List projects.
const projects = await lokaliseApi.projects().list();
projects.items[0].name;

// Upload a file.
const process = await lokaliseApi.files().upload(project_id, {
	data: data_base64,
	filename: "test1.json",
	lang_iso: "en",
});

process.status; // "queued"
```

### Vantage API

Use `LokaliseApiVantage` to work with Vantage projects, content, uploads, imports, and exports.

```ts
import { LokaliseApiVantage } from "@lokalise/node-api";

const lokaliseVantageApi = new LokaliseApiVantage({
	apiKey: "<apiKey>",
});

// List projects in a team.
const projects = await lokaliseVantageApi.projects().list({
	team_id: "<teamId>",
	limit: 10,
});

projects.items[0].name;

// List project items.
const items = await lokaliseVantageApi.projectItems().list({
	project_id: "<projectId>",
	limit: 10,
});

items.items[0].name;
```

Both clients use the same API token. You can initialize both in the same application if you need to work with Expert and Vantage projects.

### OAuth2 authentication

For the Expert API, you can alternatively use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow).

**Note:** OAuth tokens expire.

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({
	apiKey: "<apiKeyObtainedViaOauth2>",
});

const projects = await lokaliseApi.projects().list();
```

### Dynamic imports

You can also import the API clients dynamically:

```ts
const { LokaliseApi, LokaliseApiVantage } = await import("@lokalise/node-api");

const expertApi = new LokaliseApi({
	apiKey: "<apiKey>",
});

const vantageApi = new LokaliseApiVantage({
	apiKey: "<apiKey>",
});
```

## Usage

Full docs live at: [lokalise.github.io/node-lokalise-api](https://lokalise.github.io/node-lokalise-api/).

Also useful:
- [repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples)
- [blog post with explanations](https://lokalise.com/blog/lokalise-apiv2-in-practice/)
- [free course "Lokalise for developers"](https://academy.lokalise.com/course/lokalise-for-developers) (Node SDK usage)

## License

This library is licensed under the [BSD 3 Clause](https://github.com/lokalise/node-lokalise-api/blob/master/LICENSE). Prior to version 5.1.0 the license was MIT.

Copyright (c) [Lokalise group](http://lokalise.com) and [Ilya Krukowski](http://bodrovis.tech)

[npm-downloads-image]: https://img.shields.io/npm/dm/%40lokalise%2Fnode-api
[npm-downloads-url]: https://npmcharts.com/compare/@lokalise/node-api?minimal=true
