---
---
# Customizing client

## Configuring timeouts

To configure timeouts, set the `requestTimeout` optional parameter. The value is in milliseconds:

```js
const client = new LokaliseApi({
  apiKey: "API_KEY",
  requestTimeout: 5e3,
});
```

## Configuring API host

By default:

- API requests made with `LokaliseApi` are sent to `https://api.lokalise.com/api2/`.
- Requests made with `LokaliseApiV1` are sent to `https://api.lokalise.com/v1/`.
- OAuth 2 authentication requests are sent to `https://app.lokalise.com`.
- OTA requests are sent to `https://ota.lokalise.com`.

To override the API host, pass the `host` option when creating a client:

```js
const client = new LokaliseApi({
  // other config ...
  host: "http://example.com",
});
```

The same option is supported by all client types. Then use your `client` as usual.

## Proxy support

If your environment requires an HTTP or HTTPS proxy to access the Lokalise API, recent Node.js versions provide built-in proxy support for native `fetch`.

Set the appropriate proxy environment variables:

```bash
HTTPS_PROXY=http://proxy.example.com:8080
HTTP_PROXY=http://proxy.example.com:8080
```

Then enable proxy support when starting Node.js:

```bash
node --use-env-proxy app.js
```

Alternatively, set the `NODE_USE_ENV_PROXY` environment variable:

```bash
NODE_USE_ENV_PROXY=1 node app.js
```

You can also use `NO_PROXY` to exclude specific hosts from proxying.

Built-in environment proxy support is available in Node.js 24.5.0+ and 22.21.0+.

## Silent mode

To supress all warning messages, set the `silent` option to `true` (`false` by default):

```js
const client = new LokaliseApi({
  // other config ...
  silent: true,
});
```