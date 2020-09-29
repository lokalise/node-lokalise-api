# Payment cards

[Payment card attributes](https://app.lokalise.com/api2docs/curl/#object-payment-cards)

## Fetch payment cards

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-cards-get)

```js
lokaliseApi.paymentCards.list();
```

## Fetch a single payment card

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-card-get)

```js
lokaliseApi.paymentCards.get(card_id);
```

## Create a payment card

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-card-post)

```js
lokaliseApi.paymentCards.create({
  number: '4242424242424242',
  cvc: 123,
  exp_month: 10,
  exp_year: 2030
});
```

## Delete a payment card

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-card-delete)

```js
lokaliseApi.paymentCards.delete(card_id);
```
