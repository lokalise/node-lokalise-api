# Webhooks

[Webhook attributes](https://app.lokalise.com/api2docs/curl/#object-webhooks)

## Fetch webhooks

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-webhooks-get)

```js
const webhooks = await lokaliseApi.webhooks().list({
  project_id: project_id,
  page: 2,
  limit: 1,
});

webhooks.items[0].url;
```

## Fetch a single webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-webhook-get)

```js
const webhook = await lokaliseApi.webhooks().get(webhook_id, {project_id: project_id});

webhook.secret;
```

## Create webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-webhook-post)

```js
const webhook = await lokaliseApi.webhooks().create(
  {url: 'https://example.com', events: ['project.exported']},
  {project_id: project_id}
);

webhook.url;
```

## Update webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-webhook-put)

```js
const webhook = await lokaliseApi.webhooks().update(
  webhook_id,
  {url: 'http://example.com', events: ['project.snapshot']},
  {project_id: project_id}
);

webhook.events[0];
```

## Delete webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-webhook-delete)

```js
const response = await lokaliseApi.webhooks().delete(
  webhook_id,
  {project_id: project_id}
);

response.webhook_deleted;
```

## Regenerate webhook secret

[API doc](https://app.lokalise.com/api2docs/curl/#transition-regenerate-a-webhook-secret-patch)

```js
const response = await lokaliseApi.webhooks().regenerate_secret(
  webhook_id,
  {project_id: project_id}
);

response.secret;
```
