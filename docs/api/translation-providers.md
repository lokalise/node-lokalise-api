---
---
# Translation providers

[Translation provider attributes](https://developers.lokalise.com/reference/translationproviders-object)

## Fetch translation providers

[API doc](https://developers.lokalise.com/reference/list-all-providers)

```js
const providers = await lokaliseApi.translationProviders().list({
  team_id: team_id,
  page: 2,
  limit: 1,
});

providers.items[0].name;
```

## Fetch a single translation provider

[API doc](https://developers.lokalise.com/reference/retrieve-a-provider)

```js
const provider = await lokaliseApi.translationProviders().get(translation_provider_id, {team_id: team_id});

provider.slug;
```
