# Lokalise API v2 official Node.js client

![npm](https://img.shields.io/npm/v/@lokalise/node-api)
![CI](https://github.com/lokalise/node-lokalise-api/actions/workflows/ci.yml/badge.svg)
![Downloads total](https://img.shields.io/npm/dt/@lokalise/node-api)

Official Node interface for the [Lokalise API](https://app.lokalise.com/api2docs/curl/#resource-getting-started).

## Quickstart

**Please note that starting from version 9 this SDK is a pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. It does not provide a CommonJS export (`require`) anymore.** Therefore you should either [convert your project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), use [dynamic import](https://v8.dev/features/dynamic-import), or stay on [version 8](https://github.com/lokalise/node-lokalise-api/tree/v8) which we are fully supporting.

Install the library:

```bash
npm install @lokalise/node-api
```

Obtain Lokalise API token in your personal profile, initialize and use the client:

```ts
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
const projects = await lokaliseApi.projects().list();
projects.items[0].name;

process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'})
process.status // => 'queued'
```

Alternatively, you can use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow) (don't forget that these tokens have expiration dates):

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });

const projects = lokaliseApi.projects().list();
```

Here's an example using dynamic import:

```ts
(async function () {
  const LokaliseApi = await (import('@lokalise/node-api').then(m => m.LokaliseApi));
  const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN});

  // use lokaliseApi here as usual...
})();
```

## Usage

Detailed documentation can be found at [lokalise.github.io/node-lokalise-api](https://lokalise.github.io/node-lokalise-api/).

You can also check [this repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples) and [this blog post with explanations](https://lokalise.com/blog/lokalise-apiv2-in-practice). Finally, you might be interested in our [free course "Lokalise for developers"](https://academy.lokalise.com/course/lokalise-for-developers) that showcases Node SDK usage.

## License

This library is licensed under the [BSD 3 Clause](https://github.com/lokalise/node-lokalise-api/blob/master/LICENSE). Prior to version 5.1.0 the license was MIT.

Copyright (c) [Lokalise group](http://lokalise.com) and [Ilya Krukowski](http://bodrovis.tech)
