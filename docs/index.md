---
---

# Lokalise APIv2 Node interface

**Please note that starting from version 9 this SDK is a pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. It does not provide a CommonJS export (`require`) anymore.** Therefore you should either [convert your project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), use [dynamic import](https://v8.dev/features/dynamic-import) (find the example below), or stay on [version 8](https://github.com/lokalise/node-lokalise-api/tree/v8).

Install the library using [NPM](https://www.npmjs.com/):

```
npm install @lokalise/node-api
```

Obtain [Lokalise API token](https://docs.lokalise.com/en/articles/1929556-api-and-ota-tokens#h_9ea8e7ff3c) in your personal profile, initialize and use the client:

```ts
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
const projects = await lokaliseApi.projects().list();
projects.items[0].name;

process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'})
process.status // => 'queued'
```

> Looking for a simple solution to perform translation uploading/downloading? Try the new [lokalise-file-exchange](https://github.com/bodrovis/lokalise-node-file-exchange) package.

Alternatively, you can use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow) (don't forget that these tokens have expiration dates):

```ts
import { LokaliseApiOAuth } from '@lokalise/node-api';

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

You can also check [this repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples) and [this blog post with explanations](https://lokalise.com/blog/lokalise-apiv2-in-practice/). Finally, you might be interested in our [free course "Lokalise for developers"](https://academy.lokalise.com/course/lokalise-for-developers) that showcases Node SDK usage.

## Usage

<nav class="index">
  {% include nav_full.html %}
</nav>

## OTA

<nav class="index">
  {% include nav_ota_full.html %}
</nav>

## Additional info

<nav class="index">
  {% include nav_full_additional.html %}
</nav>
