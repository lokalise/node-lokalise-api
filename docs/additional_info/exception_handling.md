# Exception handling

To handle request errors, you can use the following approach:

```js
lokaliseApi.projects().list().catch(
  (e) => {
    console.log(e);
  }
);
```

Or with async/await:

```js
try {
  await lokaliseApi.projects().list();
} catch (e) {
  console.error(e);
  console.log(e.message); // "Request timed out after 1000ms"
  console.log(e.code); // 408
  console.log(e.details); // { reason: "timeout" }
}
```

[Error codes](https://developers.lokalise.com/reference/api-errors) are listed in the API docs.

## API Rate Limits

[Access to all endpoints is limited](https://app.lokalise.com/api2docs/curl/#resource-rate-limits) to 6 requests per second from 14 September, 2021. This limit is applied per API token and per IP address. If you exceed the limit, a 429 HTTP status code will be returned and the corresponding exception will be raised that you should handle properly. To handle such errors, we recommend an exponential backoff mechanism with a limited number of retries.