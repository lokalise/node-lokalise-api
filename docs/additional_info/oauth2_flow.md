---
---
# OAuth 2 flow

You can request and refresh OAuth 2 tokens using this client. First of all, import the necessary module and instantiate the class with your client id and client secret:

```ts
import { LokaliseAuth } from "@lokalise/node-api";

const lokaliseAuth = new LokaliseAuth("client id", "client secret");
```

Now `lokaliseAuth` can be used to request and refresh tokens.

## Generating authentication URL

The next step is generating a special authentication URL:

```ts
const url = lokaliseAuth.auth(
  ["read_projects", "write_team_groups"],
  "http://example.com/redirect",
  "random123"
);
```

Your users must visit this URL and explicitly permit access. As a result, they'll get an authentication token that you'll require on the next step.

THe `auth` method accepts the following arguments:

* `scope` (string or array of strings, required) — OAuth 2 scopes that you would like to request access to.
* `redirect_uri` (string, optional)
* `state` (string, optional) — a random string to protect from CSRF attacks.

## Requesting OAuth 2 access token

Now request the token using the secret code obtained at the previous step:

```ts
const response = await lokaliseAuth.token("secret code");
```

The `response` is an object with the following keys:

* `access_token` — your OAuth 2 access token.
* `refresh_token` — token to request a new access token.
* `expires_in` — token expiration time.
* `token_type` — usually, "Bearer".

## Refreshing OAuth 2 access token

OAuth 2 access token has an expiration date but you can easily obtain a new one using refresh token:

```ts
const response = await lokaliseAuth.refresh("refresh token");
```

The `response` is an object with the following keys:

* `access_token` — your new access token.
* `scope` — an array of OAuth 2 scopes that you requested initially.
* `expires_in` — token expiration time.
* `token_type` — usually, "Bearer".

## Using OAuth 2 tokens

After you've obtained an OAuth 2 token, you can use it to perform requests on the user's behalf:

```ts
import { LokaliseApiOAuth } from "@lokalise/node-api";

const lokaliseApi = new LokaliseApiOAuth({ apiKey: '<apiKeyObtainedViaOauth2>' });

const projects = await lokaliseApi.projects().list();
```