---
---
# Payment cards

[Payment card attributes](https://developers.lokalise.com/reference/payment-card-object)

## Fetch payment cards

[API doc](https://developers.lokalise.com/reference/list-all-cards)

```js
const cards = await lokaliseApi.paymentCards().list({ page: 2, limit: 1 });

cards.items[0].card_id;
```

## Fetch a single payment card

[API doc](https://developers.lokalise.com/reference/retrieve-a-card)

```js
const card = await lokaliseApi.paymentCards().get(card_id);

card.last4;
```

## Create a payment card

[API doc](https://developers.lokalise.com/reference/create-a-card)

```js
const card = await lokaliseApi.paymentCards().create({
  number: '4242424242424242',
  cvc: 123,
  exp_month: 10,
  exp_year: 2030
});

card.brand;
```

## Delete a payment card

[API doc](https://developers.lokalise.com/reference/delete-a-card)

```js
const result = await lokaliseApi.paymentCards().delete(card_id);

result.card_deleted
```
