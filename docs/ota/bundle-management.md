---
---
# Bundle management

**Please note that this endpoint requires an instance of `LokaliseApiOta` with a JWT. Refer to the [OTA introduction article to learn more]({{ '/ota/introduction' | relative_url }}).**

## List bundles

[API doc](https://developers.lokalise.com/reference/list-bundles)

```ts
const bundles = await lokaliseApiOta.otaBundleManagement().list({
  teamId: 123,
  lokaliseProjectId: "123.abc",
});

bundles[0].id; // 56789
```

## Get bundle

[API doc](https://developers.lokalise.com/reference/get-bundle)

```ts
const bundleId = 5678;

const bundle = await lokaliseApiOta.otaBundleManagement().get(bundleId, {
  teamId: 123,
  lokaliseProjectId: "123.abc",
});

bundle.isProduction; // true
bundle.description; // "My demo bundle"
```

## Update bundle

[API doc](https://developers.lokalise.com/reference/update-bundle)

```ts
const bundleId = 5678;

const bundle = await lokaliseApiOta.otaBundleManagement().update(
  bundleId,
  {
    description: "updated",
  },
  {
    teamId: 123,
    lokaliseProjectId: "123.abc",
  },
);

bundle.description; // "updated"
```

## Delete bundle

[API doc](https://developers.lokalise.com/reference/detele-bundle)

```ts
const response = await lokaliseApiOta
  .otaBundleManagement()
  .delete(tokenIdDelete, {
    teamId: teamId,
    lokaliseProjectId: projectId,
  });

response.deleted; // true
```