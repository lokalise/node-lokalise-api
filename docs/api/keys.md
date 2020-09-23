# Translation keys

[Key attributes](https://app.lokalise.com/api2docs/curl/#object-keys)

## Fetch project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-keys-get)

```ruby
@client.keys(project_id, params = {})   # Input:
                                        ## project_id (string, required)
                                        ## params (hash)
                                        ### :page and :limit
                                        # Output:
                                        ## Collection of keys available in the given project
```

## Fetch a single project key

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-key-get)

```ruby
@client.key(project_id, key_id, params = {})    # Input:
                                                ## project_id (string, required)
                                                ## key_id (string, required)
                                                ## params (hash)
                                                ### :disable_references (string) - possible values are "1" and "0".
                                                # Output:
                                                ## Project key
```

## Create project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-keys-post)

```ruby
@client.create_keys(project_id, params)   # Input:
                                          ## project_id (string, required)
                                          ## params (array of hashes or hash, required)
                                          ### :key_name (string or hash, required) - for projects with enabled per-platform key names, pass hash with "ios", "android", "web" and "other" params.
                                          ### :platforms (array) - supported values are "ios", "android", "web" and "other"
                                          ### Find all other supported attributes at https://app.lokalise.com/api2docs/curl/#transition-create-keys-post
                                          # Output:
                                          ## Collection of newly created keys
```

## Update project key

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-key-put)

```ruby
@client.update_key(project_id, key_id, params = {})   # Input:
                                                      ## project_id (string, required)
                                                      ## key_id (string, required)
                                                      ## params (hash)
                                                      ### Find a list of supported attributes at https://app.lokalise.com/api2docs/curl/#transition-update-a-key-put
                                                      # Output:
                                                      ## Updated key
```

Alternatively:

```ruby
key = @client.key('project_id', 'key_id')
key.update(params)
```

## Bulk update project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-bulk-update-put)

```ruby
@client.update_keys(project_id, params)  # Input:
                                         ## project_id (string, required)
                                         ## params (hash or array of hashes, required)
                                         ### :key_id (string, required)
                                         ### Find all other supported attributes at https://app.lokalise.com/api2docs/curl/#transition-bulk-update-put
                                         # Output:
                                         ## Collection of updated keys
```

Example:

```ruby
client.update_keys '123.abc', [
  {
    key_id: 456,
    description: 'bulk updated'
  },
  {
    key_id: 769,
    tags: %w[bulk update]
  }
]
```

## Delete project key

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-key-delete)

```ruby
@client.destroy_key(project_id, key_id) # Input:
                                        ## project_id (string, required)
                                        ## key_id (string, required)
                                        # Output:
                                        ## Hash with project_id and "key_removed" set to "true"
```

Alternatively:

```ruby
key = @client.key('project_id', 'key_id')
key.destroy
```

## Bulk delete project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-multiple-keys-delete)

```ruby
@client.destroy_keys(project_id, key_ids) # Input:
                                          ## project_id (string, required)
                                          ## key_ids (array, required)
                                          # Output:
                                          ## Hash with project_id and "keys_removed" set to "true"
```

Alternatively:

```ruby
keys = @client.keys('project_id')
keys.destroy_all # => will effectively destroy all keys in the project
```
