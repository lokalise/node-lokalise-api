# Introduction

While OTA (over-the-air) endpoints are part of the main Lokalise API, they have certain specifics.

In order to address those specifics, the SDK introduces two additional clients:

* `LokaliseApiOta` — you'll use this client to create OTA SDK tokens, create bundle freezes, publish bundles, and so on. This client requires a specially generated JWT (see below).
* `LokaliseOtaBundles` — this client is utilized only to request OTA bundles and it requires an OTA SDK token.

[Please refer to the following guide to learn about the OTA API in general.](https://developers.lokalise.com/reference/working-with-the-ota-api)

[To learn about the Node SDK requirements and the installation process, please refer to the Getting started article.](https://lokalise.github.io/node-lokalise-api/api/getting-started)

## Managing bundles and tokens

So, basically you'll use the `LokaliseApiOta` for all the OTA endpoints except for the [Get OTA bundle](https://developers.lokalise.com/reference/get-ota-bundle).

All endpoints supported by the `LokaliseApiOta` client require the usage of a JWT (in other words, you **cannot use the regular Lokalise API token**). Therefore, to get started you'll need to generate your JWT:

```ts
import { LokaliseApi } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApi({ apiKey: '<apiKey>'});
```

Please note that here you'll need to provide your regular Lokalise API token that can be obtained in your [personal profile](https://lokalise.com/profile#apitokens) (*API tokens* section).

Now request the JWT via the [Create service JWT endpoint](https://developers.lokalise.com/reference/create-service-jwt)

```ts
const response = await lokaliseApi.jwt().create("project_id");

const jwt = response.jwt // => "eyJ0eXAiOiJKV1QiLCJhbG..."
```

Please don't forget that JWT have expiration dates!

Now use this JWT to instantiate the OTA API client:

```ts
const lokaliseApiOta = new LokaliseApiOta({ apiKey: jwt });
```

At this point you can send OTA API requests, for example:

```ts
const tokens = await lokaliseApiOta.otaSdkTokens().list({
  teamId: 1234,
  lokaliseProjectId: "123.abc",
});

tokens[0].token; // 6789
```

Refer to the corresponding sections to learn about the supported methods.

## Requesting OTA bundles

In order to request OTA bundles via the [Get OTA bundle](https://developers.lokalise.com/reference/get-ota-bundle) endpoint you'll need the `LokaliseOtaBundles`. This is because it needs a special OTA SDK token that is obtained separately.

So, the process is the following:

* Generate JWT as explained in the section above
* Instantiate `LokaliseApiOta` with the generated JWT
* Use the instantiated `LokaliseApiOta` to request an OTA SDK in the following way:

```ts
const result = await lokaliseApiOta.otaSdkTokens().create({
  teamId: 1234,
  lokaliseProjectId: "123.abc",
});

const otaSdk = result.token;
```

* Now use the generated OTA SDK to instantiate the `LokaliseOtaBundles`:

```ts
const lokaliseOtaBundles = new LokaliseOtaBundles({ apiKey: otaSdk });
```

* Use the `lokaliseOtaBundles` to request an OTA bundle:

```ts
const bundle = await lokaliseOtaBundles.otaBundles().get(
  {
    appVersion: "1.2.3",
    transVersion: 1,
  },
  {
    framework: "ios_sdk",
    lokaliseProjectId: "123.abc",
  },
);

const url = bundle.url; // "https://ota-bundles.lokalise.com/..."
```

That's it. Please note that it might take a while for the SDK token to actually become "active". In other words, right after the token creation you might see 401 errors but these are usually resolved by themselves in 30-60 seconds.

Alternatively, you can generate an OTA SDK token using the Lokalise UI. To achieve that, open your Lokalise project, proceed to **Settings**, find the **Lokalise OTA Tokens** section and click **Generate new token**.