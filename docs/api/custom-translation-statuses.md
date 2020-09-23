# Custom translation statuses

[Translation Status attributes](https://app.lokalise.com/api2docs/curl/#object-translation-statuses)

*Custom translation statuses must be enabled for the project before using this endpoint!* It can be done in the project settings.

## Fetch translation statuses

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-custom-translation-statuses-get)

```ruby
@client.translation_statuses(project_id, params = {}) # Input:
                                                      ## project_id (string, required)
                                                      ## params (hash)
                                                      ### :page and :limit
                                                      # Output:
                                                      ## Collection of translation statuses for the project
```

## Fetch a single translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-custom-translation-status-get)

```ruby
@client.translation_status(project_id, status_id) # Input:
                                                  ## project_id (string, required)
                                                  ## status_id (string or integer, required)
                                                  # Output:
                                                  ## Translation status inside the given project
```

## Create translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-custom-translation-status-post)

```ruby
@client.create_translation_status(project_id, params) # Input:
                                                      ## project_id (string, required)
                                                      ## params (hash, required)
                                                      ### :title (string, required) - title of the new status
                                                      ### :color (string, required) - HEX color code of the new status. Lokalise allows a very limited number of color codes to set. Check the official docs or use `#translation_status_colors` method listed below to find the list of supported colors
                                                      # Output:
                                                      ## Created translation status
```

## Update translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-custom-translation-status-put)

```ruby
@client.update_translation_status(project_id, status_id, params)  # Input:
                                                                  ## project_id (string, required)
                                                                  ## status_id (string or integer, required)
                                                                  ## params (hash, required)
                                                                  ### :title (string, required) - title of the new status
                                                                  ### :color (string, required) - HEX color code of the new status
                                                                  # Output:
                                                                  ## Updated translation status
```

Alternatively:

```ruby
status = @client.translation_status(project_id, status_id)
status.update(params)
```

## Delete translation status

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-custom-translation-status-delete)

```ruby
@client.destroy_translation_status(project_id, status_id) # Input:
                                                          ## project_id (string, required)
                                                          ## status_id (string or integer, required)
                                                          # Output:
                                                          ## Result of the delete operation
```

Alternatively:

```ruby
status = @client.translation_status(project_id, status_id)
status.destroy
```

## Supported color codes for translation statuses

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-available-colors-for-custom-translation-statuses-get)

As long as Lokalise supports only very limited array of color hexadecimal codes for custom translation statuses, this method can be used to fetch all permitted values.

```ruby
@client.translation_status_colors(project_id) # Input:
                                              ## project_id (string, required)
                                              # Output:
                                              ## Array of color codes in HEX format
```
