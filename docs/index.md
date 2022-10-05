---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

# Lokalise APIv2 Node interface

**Please note that starting from version 9 this SDK is a pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) module. It does not provide a CommonJS export (`require`) anymore.** Therefore you should either [convert your project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), use [dynamic import](https://v8.dev/features/dynamic-import), or stay on version 8 which we are fully supporting.

Install the library using [NPM](https://npmjs.com/):

    npm install @lokalise/node-api

Obtain [Lokalise API token](https://docs.lokalise.com/en/articles/1929556-api-tokens) in your personal profile, initialize and use the client:

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
const { LokaliseApiOAuth } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });

const projects = lokaliseApi.projects().list();
```

You can also check [this repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples) and [this blog post with explanations](https://lokalise.com/blog/lokalise-apiv2-in-practice).

## Usage

<nav class="index">
  {% include nav_full.html %}
</nav>

## Additional info

<nav class="index">
  {% include nav_full_additional.html %}
</nav>
