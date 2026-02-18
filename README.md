# Lokalise API v2 official Node.js client

![npm](https://img.shields.io/npm/v/@lokalise/node-api)
![CI](https://github.com/lokalise/node-lokalise-api/actions/workflows/ci.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/lokalise/node-lokalise-api/badge.svg?branch=master)](https://coveralls.io/github/lokalise/node-lokalise-api?branch=master)
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

Official Node interface for the [Lokalise API](https://developers.lokalise.com/reference/lokalise-rest-api).

> Looking for a simple way to upload/download translations? Try [lokalise-file-exchange](https://github.com/bodrovis/lokalise-node-file-exchange).

## Quickstart

**Heads up:** starting from **v9**, this SDK is **pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** and no longer ships a CommonJS (`require`) export. Your options:
- convert your project to ESM ([see this guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c))
- use [dynamic import](https://v8.dev/features/dynamic-import) (example below)
- or stay on [v8](https://github.com/lokalise/node-lokalise-api/tree/v8)

Install:

```bash
npm install @lokalise/node-api
```

[Get a Lokalise API token from your personal profile](https://docs.lokalise.com/en/articles/1929556-api-and-ota-tokens#h_9ea8e7ff3c), then initialize and use the client:

```ts
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: "<apiKey>" });

const projects = await lokaliseApi.projects().list();
projects.items[0].name;

const process = await lokaliseApi.files().upload(project_id, {
  data: data_base64,
  filename: "test1.json",
  lang_iso: "en",
});

process.status; // => "queued"
```

Alternatively, you can use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow) (*note: OAuth tokens expire*):

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({ apiKey: "<apiKeyObtainedViaOauth2>" });

const projects = await lokaliseApi.projects().list();
```

Dynamic import example:

```ts
(async function () {
  const LokaliseApi = await import("@lokalise/node-api").then((m) => m.LokaliseApi);
  const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN });

  // use lokaliseApi here as usual...
})();
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
