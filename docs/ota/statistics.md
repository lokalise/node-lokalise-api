# OTA statistics

**Please note that this endpoint requires an instance of `LokaliseApiOta` with a JWT. Refer to the [OTA introduction article to learn more](https://lokalise.github.io/node-lokalise-api/ota/introduction).**

## View usage

[API doc](https://developers.lokalise.com/reference/project-stats)

```ts
const stat = await lokaliseApiOta.otaUsageStatistics().get(
  {
    dateFrom: "2023-06-01",
    dateTo: "2023-08-23",
  },
  {
    teamId: 123,
    lokaliseProjectId: "123.abc",
  },
);

stat.monthly[0].downloads; // 100
stat.totals.trafficBytes; // "56789"
```