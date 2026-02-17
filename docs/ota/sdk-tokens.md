---
---
# SDK tokens

**Please note that this endpoint requires an instance of `LokaliseApiOta` with a JWT. Refer to the [OTA introduction article to learn more]({{ '/ota/introduction' | relative_url }}).**

## List tokens

[API doc](https://developers.lokalise.com/reference/list-tokens)

```ts
const tokens = await lokaliseApiOta.otaSdkTokens().list({
  teamId: 1234,
  lokaliseProjectId: "123.abc",
});

const token = tokens[0];

token.id; // 789
token.projectId; // "123.abc"
```

## Create token

[API doc](https://developers.lokalise.com/reference/create-token)

```ts
const sdkToken = await lokaliseApiOta.otaSdkTokens().create({
  teamId: 1234,
  lokaliseProjectId: "123.abc",
});

sdkToken.id; // 9433
sdkToken.token; // "a6hf9bf9f88e0779275d4832ca0e56933a89"
sdkToken.projectId; // 20984
sdkToken.lokaliseId; // 123
sdkToken.createdAt; // "2023-08-22T15:05:51.227Z"
```

## Delete token

[API doc](https://developers.lokalise.com/reference/delete-token)

```ts
const tokenId = 12345;

const response = await lokaliseApiOta.otaSdkTokens().delete(tokenId, {
  teamId: 789,
  lokaliseProjectId: "123.abc",
});

response.id; // 12345
response.deleted; // true
```