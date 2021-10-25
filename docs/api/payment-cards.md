# Payment cards

[Payment card attributes](https://app.lokalise.com/api2docs/curl/#object-payment-cards)

## Fetch payment cards

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-cards-get)

```js
const cards = await lokaliseApi.paymentCards().list({ page: 2, limit: 1 });

cards.items[0].card_id;
```

## Fetch a single payment card

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-card-get)

```js
const card = await lokaliseApi.paymentCards().get(card_id);

card.last4;
```

## Create a payment card

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-card-post)

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

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-card-delete)

```js
const result = await lokaliseApi.paymentCards().delete(card_id);

result.card_deleted
```
