# Webhooks

[Webhook attributes](https://app.lokalise.com/api2docs/curl/#object-webhooks)

## Fetch webhooks

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-webhooks-get)

```ruby
@client.webhooks(project_id, params = {}) # Input:
                                          ## project_id (string, required)
                                          ## params (hash)
                                          ### :page and :limit
                                          # Output:
                                          ## Collection of webhooks for the project
```

## Fetch a single webhook

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-webhook-get)

```ruby
@client.webhook(project_id, webhook_id)   # Input:
                                          ## project_id (string, required)
                                          ## webhook_id (string, required)
                                          # Output:
                                          ## Webhook for the given project
```

## Create webhook

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-webhook-post)

```ruby
@client.create_webhook(project_id, params)    # Input:
                                              ## project_id (string, required)
                                              ## params (hash, required)
                                              ### :url (string, required) - webhook URL
                                              ### :events (array, required) - events to subscribe to. Check the API docs to find the list of supported events
                                              ### :event_lang_map (array) - map the event with an array of languages iso codes
                                              # Output:
                                              ## Created webhook
```

## Update webhook

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-webhook-put)

```ruby
@client.update_webhook(project_id, webhook_id, params)    # Input:
                                                          ## project_id (string, required)
                                                          ## webhook_id (string, required)
                                                          ## params (hash)
                                                          ### :url (string) - webhook URL
                                                          ### :events (array) - events to subscribe to. Check the API docs to find the list of supported events
                                                          ### :event_lang_map (array) - map the event with an array of languages iso codes
                                                          # Output:
                                                          ## Updated webhook
```

Alternatively:

```ruby
webhook = @client.webhook(project_id, webhook_id)
webhook.update(params)
```

## Delete webhook

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-webhook-delete)

```ruby
@client.destroy_webhook(project_id, webhook_id)   # Input:
                                                  ## project_id (string, required)
                                                  ## webhook_id (string, required)
                                                  # Output:
                                                  ## Result of the delete operation
```

Alternatively:

```ruby
webhook = @client.webhook(project_id, webhook_id)
webhook.destroy
```

## Regenerate webhook secret

[Doc](https://app.lokalise.com/api2docs/curl/#transition-regenerate-a-webhook-secret-patch)

```ruby
@client.regenerate_webhook_secret(project_id, webhook_id) # Input:
                                                          ## project_id (string, required)
                                                          ## webhook_id (string, required)
                                                          # Output:
                                                          ## Hash containing `project_id` and new `secret`
```

Alternatively:

```ruby
webhook = @client.webhook(project_id, webhook_id)
webhook.regenerate_secret
```
