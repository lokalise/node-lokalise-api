# OTA freeze periods

**Please note that this endpoint requires an instance of `LokaliseApiOta` with a JWT. Refer to the [OTA introduction article to learn more](https://lokalise.github.io/node-lokalise-api/ota/introduction).**

## List freeze periods

[API doc](https://developers.lokalise.com/reference/list-bundle-freezes)

```ts
const freezes = await lokaliseApiOta.otaFreezePeriods().list({
  teamId: 123,
  lokaliseProjectId: "123.abc",
  framework: "ios_sdk",
});

freezes[0].id; // 1234
```

## Create freeze period

[API doc](https://developers.lokalise.com/reference/create-bundle-freeze)

```ts
const freeze = await lokaliseApiOta.otaFreezePeriods().create(
  {
    from: "5.0",
    to: "6.0",
    bundleId: 664798,
  },
  {
    teamId: 123,
    lokaliseProjectId: "123.abc",
  },
);

freeze.id; // 789
freeze.from; // "5.0"
```

## Update freeze period

[API doc](https://developers.lokalise.com/reference/update-bundle-freeze)

```ts
const freezeId = 789;

const freeze = await lokaliseApiOta.otaFreezePeriods().update(
  freezeId,
  {
    from: "5.0",
    to: "7.0",
    bundleId: 664798,
  },
  {
    teamId: 123,
    lokaliseProjectId: "123.abc",
  },
);

freeze.to; // "7.0"
```

## Delete freeze period

[API doc](https://developers.lokalise.com/reference/delete-bundle-freeze)

```ts
const freezeId = 789;

const response = await lokaliseApiOta.otaFreezePeriods().delete(freezeId, {
  teamId: 123,
  lokaliseProjectId: "123.abc",
});

response.deleted; // true
```