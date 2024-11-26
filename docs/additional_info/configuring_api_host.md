# Configuring API host

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