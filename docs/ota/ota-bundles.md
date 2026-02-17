---
---
# OTA bundles

[OTA bundle attributes](https://developers.lokalise.com/reference/bundle-object)

## Get OTA bundle

[API doc](https://developers.lokalise.com/reference/get-ota-bundle)

**To learn how to generate an OTA SDK token, [please refer to the OTA Introduction article ("Requesting OTA bundles" section)]({{ '/ota/introduction#requesting-ota-bundles' | relative_url }}).**

```ts
const lokaliseOtaBundles = new LokaliseOtaBundles({ apiKey: "YOUR_OTA_SDK_TOKEN" });

const bundle = await lokaliseOtaBundles.otaBundles().get(
  {
    appVersion: "1.2.3",
    transVersion: 1,
  },
  {
    framework: "ios_sdk",
    lokaliseProjectId: "123.abc",
  },
);

bundle.url; // "https://ota-bundles.lokalise.com/..."
bundle.version; // 1234
```