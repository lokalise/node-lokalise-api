---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

# Lokalise APIv2 Node interface

Install the library using [NPM](https://npmjs.com/):

    npm install @lokalise/node-api

Obtain [Lokalise API token](https://docs.lokalise.com/en/articles/1929556-api-tokens) in your personal profile, initialize and use the client:

```ts
const { LokaliseApi } = require('@lokalise/node-api');

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
const projects = lokaliseApi.projects().list();
projects.items[0].name;

process = await lokaliseApi.files().upload(project_id,
  {data: data_base64, filename: 'test1.json', lang_iso: 'en'})
process.status // => 'queued'
```

Alternatively, you can use tokens obtained via [OAuth2](https://docs.lokalise.com/en/articles/5574713-oauth-2) (don't forget that these tokens have expiration dates):

```ts
const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });

const projects = lokaliseApi.projects().list();
```

You can also check [this repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples).

## Usage

<nav class="index">
  {% include nav_full.html %}
</nav>

## Additional info

<nav class="index">
  {% include nav_full_additional.html %}
</nav>
