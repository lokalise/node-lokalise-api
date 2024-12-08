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

By default, API requests are sent to the `https://api.lokalise.com/api2/` URL that acts as a host.

OAuth 2 authentication requests are sent to `https://app.lokalise.com`.

OTA requests are sent to `https://ota.lokalise.com`.

To override the API host, use the following approach (works for all client types):

```js
const client = new LokaliseApi({
  // other config ...
  host: "http://example.com",
});
```

Then use your `client` as usual.

## Proxy support

If you are behind a firewall and have to use proxy in order to communicate with Lokalise API, that's not a problem! You can take advantage of the [global-agent](https://github.com/gajus/global-agent) package which allows to enable proxy globally without the need to do any changes to your API-related script.

Detailed explanations and usage instructions can be found in the [global-agent docs](https://github.com/gajus/global-agent#usage).