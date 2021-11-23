# Team user billing details

[Team user billing details attributes](https://app.lokalise.com/api2docs/curl/#object-team-user-billing-details)

## Fetch team user billing details

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-team-user-billing-details-get)

```js
const team_id = 1234;
const details = await lokaliseApi.teamUserBillingDetails().get(team_id);

details.company;
details.address1;
details.zip;
```

## Create team user billing details

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-team-user-billing-details-post)

```js
const team_id = 1234;
const details = await lokaliseApi.teamUserBillingDetails().create(
  {
    billing_email: "hello@example.com",
    country_code: "LV",
    zip: "LV-1234",
  },
  { team_id: team_id }
);

details.billing_email;
details.country_code;
```

## Update team user billing details

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-team-user-billing-details-put)

```js
const team_id = 1234;
const details = await lokaliseApi
  .teamUserBillingDetails()
  .update(team_id, {
    vatnumber: "123",
    address1: "Line 1",
    address2: "Line 2",
    country_code: "LV",
    billing_email: "updated@example.com",
    zip: "LV-1234",
  });

details.billing_email;
details.country_code;
```