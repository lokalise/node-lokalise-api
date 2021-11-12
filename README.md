# Lokalise API v2 official Node.js client

![npm](https://img.shields.io/npm/v/@lokalise/node-api)
[![Build Status](https://travis-ci.com/lokalise/node-lokalise-api.svg?branch=master)](https://travis-ci.com/github/lokalise/node-lokalise-api)
[![Test Coverage](https://codecov.io/gh/lokalise/node-lokalise-api/graph/badge.svg)](https://codecov.io/gh/lokalise/node-lokalise-api)
![Downloads total](https://img.shields.io/npm/dt/@lokalise/node-api)

Official Node interface for the [Lokalise API](https://app.lokalise.com/api2docs/curl/#resource-getting-started).

## Quickstart

Install the library:

```bash
npm install @lokalise/node-api
```

Obtain Lokalise API token in your personal profile, initialize and use the client:

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

## Usage

Detailed documentation can be found at [lokalise.github.io/node-lokalise-api](https://lokalise.github.io/node-lokalise-api/).

You can also check [this repo containing some usage examples](https://github.com/bodrovis-learning/Lokalise-APIv2-Samples) and [this blog post with explanations](https://lokalise.com/blog/lokalise-apiv2-in-practice).

## License

This library is licensed under the [BSD 3 Clause](https://github.com/lokalise/node-lokalise-api/blob/master/LICENSE). Prior to version 5.1.0 the license was MIT.

Copyright (c) [Lokalise group](http://lokalise.com) and [Ilya Bodrov](http://bodrovis.tech)
