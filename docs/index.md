---
---

# Lokalise Node.js SDK

Install the library using [npm](https://www.npmjs.com/):

```bash
npm install @lokalise/node-api
```

Obtain a [Lokalise API token](https://docs.lokalise.com/en/articles/1929556-api-and-ota-tokens#h_9ea8e7ff3c) from your personal profile, then initialize the client for the API you want to use.

## Expert API

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

> Looking for a simple solution to upload and download translations? Try the [lokalise-file-exchange](https://github.com/bodrovis/lokalise-node-file-exchange) package.

You can also use tokens obtained via [OAuth2](https://lokalise.github.io/node-lokalise-api/additional_info/oauth2_flow). Note that OAuth tokens expire.

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({
  apiKey: "<apiKeyObtainedViaOauth2>",
});

const projects = await lokaliseApi.projects().list();
```

For more examples, check the [sample repository](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples) and [blog post](https://lokalise.com/blog/lokalise-apiv2-in-practice/). You can also take our free [Lokalise for developers](https://academy.lokalise.com/course/lokalise-for-developers) course, which demonstrates Node.js SDK usage.

## Vantage API

Use `LokaliseApiVantage` to manage Vantage projects, content, translations, uploads, imports, and exports.

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

Both Expert and Vantage clients use the same API token. You can initialize both clients in the same application.

## Dynamic imports

Both clients support dynamic imports:

```ts
const { LokaliseApi, LokaliseApiVantage } = await import(
  "@lokalise/node-api"
);

const expertApi = new LokaliseApi({
  apiKey: "<apiKey>",
});

const vantageApi = new LokaliseApiVantage({
  apiKey: "<apiKey>",
});
```