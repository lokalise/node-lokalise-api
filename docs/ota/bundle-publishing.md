# Bundle publishing

**Please note that this endpoint requires an instance of `LokaliseApiOta` with a JWT. Refer to the [OTA introduction article to learn more](https://lokalise.github.io/node-lokalise-api/ota/introduction).**

## Publish bundle

[API doc](https://developers.lokalise.com/reference/publish-bundle)

```ts
const bundleId = 567;

await lokaliseApiOta.otaBundlePublishing().publish(bundleId, {
  teamId: 123,
  lokaliseProjectId: "123.abc",
  framework: "android_sdk",
});
```

Please note that the `publish` method does not return anything because the endpoint itself responds with an empty body. Thus, if the request was successful and there were not exceptions, you can consider your bundle to be published.

## Stage bundle

[API doc](https://developers.lokalise.com/reference/stage-bundle)

```ts
const bundleId = 567;

await lokaliseApiOta.otaBundlePublishing().stage(bundleId, {
  teamId: 123,
  lokaliseProjectId: "123.abc",
  framework: "android_sdk",
});
```

Please note that the `stage` method does not return anything because the endpoint itself responds with an empty body. Thus, if the request was successful and there were not exceptions, you can consider your bundle to be staged.