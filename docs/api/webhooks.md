---
---
# Webhooks

## Fetch webhooks

[API doc](https://developers.lokalise.com/reference/list-all-webhooks)

```js
const webhooks = await lokaliseApi.webhooks().list({
  project_id: project_id,
  page: 2,
  limit: 1,
});

webhooks.items[0].url;
```

## Fetch a single webhook

[API doc](https://developers.lokalise.com/reference/retrieve-a-webhook)

```js
const webhook = await lokaliseApi.webhooks().get(webhook_id, {project_id: project_id});

webhook.secret;
```

## Create webhook

[API doc](https://developers.lokalise.com/reference/create-a-webhook)

```js
const webhook = await lokaliseApi.webhooks().create(
  {url: 'https://example.com', events: ['project.exported']},
  {project_id: project_id}
);

webhook.url;
```

## Update webhook

[API doc](https://developers.lokalise.com/reference/update-a-webhook)

```js
const webhook = await lokaliseApi.webhooks().update(
  webhook_id,
  {url: 'http://example.com', events: ['project.snapshot']},
  {project_id: project_id}
);

webhook.events[0];
```

## Delete webhook

[API doc](https://developers.lokalise.com/reference/delete-a-webhook)

```js
const response = await lokaliseApi.webhooks().delete(
  webhook_id,
  {project_id: project_id}
);

response.webhook_deleted;
```

## Regenerate webhook secret

[API doc](https://developers.lokalise.com/reference/regenerate-a-webhook-secret)

```js
const response = await lokaliseApi.webhooks().regenerate_secret(
  webhook_id,
  {project_id: project_id}
);

response.secret;
```
