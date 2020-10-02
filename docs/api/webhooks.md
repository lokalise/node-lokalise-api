# Webhooks

[Webhook attributes](https://app.lokalise.com/api2docs/curl/#object-webhooks)

## Fetch webhooks

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-webhooks-get)

```js
lokaliseApi.webhooks.list({project_id: project_id});
```

## Fetch a single webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-webhook-get)

```js
lokaliseApi.webhooks.get(webhook_id, {project_id: project_id});
```

## Create webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-webhook-post)

```js
lokaliseApi.webhooks.create(
  {url: 'https://example.com', events: ['project.exported']},
  {project_id: project_id}
);
```

## Update webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-webhook-put)

```js
lokaliseApi.webhooks.update(
  webhook_id,
  {url: 'http://example.com', events: ['project.snapshot']},
  {project_id: project_id}
);
```

## Delete webhook

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-webhook-delete)

```js
lokaliseApi.webhooks.delete(
  webhook_id,
  {project_id: project_id}
);
```

## Regenerate webhook secret

[API doc](https://app.lokalise.com/api2docs/curl/#transition-regenerate-a-webhook-secret-patch)

```js
lokaliseApi.webhooks.regenerate_secret(
  webhook_id,
  {project_id: project_id}
);
```
