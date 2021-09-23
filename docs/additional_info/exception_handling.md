# Exception handling

To handle request errors, you may use the following approach:

```js
lokaliseApi.projects().list().catch(
  (e) => {
    console.log(e);
  }
);
```

[Error codes](https://app.lokalise.com/api2docs/curl/#resource-errors) are listed in the API docs.

## API Rate Limits

[Access to all endpoints is limited](https://app.lokalise.com/api2docs/curl/#resource-rate-limits) to 6 requests per second from 14 September, 2021. This limit is applied per API token and per IP address. If you exceed the limit, a 429 HTTP status code will be returned and the corresponding exception will be raised that you should handle properly. To handle such errors, we recommend an exponential backoff mechanism with a limited number of retries.

Only one concurrent request per token is allowed.