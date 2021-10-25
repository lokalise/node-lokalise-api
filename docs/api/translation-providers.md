# Translation providers

[Translation provider attributes](https://app.lokalise.com/api2docs/curl/#object-translation-providers)

## Fetch translation providers

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-providers-get)

```js
const providers = await lokaliseApi.translationProviders().list({
  team_id: team_id,
  page: 2,
  limit: 1,
});

providers.items[0].name;
```

## Fetch a single translation provider

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-provider-get)

```js
const provider = await lokaliseApi.translationProviders().get(translation_provider_id, {team_id: team_id});

provider.slug;
```
