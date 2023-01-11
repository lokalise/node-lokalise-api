# JWT

## Get OTA JWT

[API doc](https://developers.lokalise.com/reference/create-service-jwt)

```js
const response = await lokaliseApi.jwt().create("project_id");

response.jwt // => "eyJ0eXAiOiJKV1QiLCJhbG..."
```