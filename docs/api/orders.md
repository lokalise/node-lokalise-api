---
---
# Translation orders

## Fetch orders

[API doc](https://developers.lokalise.com/reference/list-all-orders)

```js
const orders = await lokaliseApi.orders().list({
  team_id: team_id,
  page: 2,
  limit: 1,
});

orders.items[0].order_id;
```

## Fetch a single order

[API doc](https://developers.lokalise.com/reference/retrieve-an-order)

```js
const order = await lokaliseApi.orders().get(order_id, {team_id: team_id});

order.order_id;
```

## Create an order

[API doc](https://developers.lokalise.com/reference/create-an-order)

```js
const order = await lokaliseApi.orders().create(
  {
    project_id: '803xyz145ba90b42abc.46800',
    card_id: '1774',
    briefing: 'My briefing',
    source_language_iso: 'en',
    target_language_isos: ['nl'],
    keys: [12345],
    provider_slug: 'gengo',
    translation_tier: '1'
  },
  {team_id: team_id}
);

order.status;
```
