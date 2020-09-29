# Exception handling

To handle request errors, you may use the following approach:

```js
lokaliseApi.projects.list().catch(
  (e) => {
    console.log(e);
  }
);
```

[Error codes](https://app.lokalise.com/api2docs/curl/#resource-errors) are listed in the API docs.

## API Rate Limits

Lokalise does not [rate-limit API requests](https://app.lokalise.com/api2docs/curl/#resource-rate-limits), however retain a right to decline the service in case of excessive use. Only one concurrent request per token is allowed. To ensure data consistency, it is not recommended to access the same project simultaneously using multiple tokens.
