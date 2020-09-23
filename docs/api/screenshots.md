# Screenshots

[Screenshot attributes](https://app.lokalise.com/api2docs/curl/#resource-screenshots)

## Fetch screenshots

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-screenshots-get)

```ruby
@client.screenshots(project_id, params = {})  # Input:
                                              ## project_id (string, required)
                                              ## params (hash)
                                              ### :page and :limit
                                              # Output:
                                              ## Collection of project screenshots
```

## Fetch a single screenshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-screenshot-get)

```ruby
@client.screeshot(project_id, screeshot_id)     # Input:
                                                ## project_id (string, required)
                                                ## screeshot_id (string, required)
                                                # Output:
                                                ## A single screenshot
```

## Create screenshots

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-screenshots-post)

```ruby
@client.create_screenshots(project_id, params)     # Input:
                                                   ## project_id (string, required)
                                                   ## params (hash or array of hashes, required)
                                                   ### :data (string, required) - the actual screenshot, base64-encoded (with leading image type "data:image/jpeg;base64,"). JPG and PNG formats are supported.
                                                   ### :title (string)
                                                   ### :description (string)
                                                   ### :ocr (boolean) - recognize translations on the image and attach screenshot to all possible keys
                                                   ### :key_ids (array) - attach the screenshot to key IDs specified
                                                   ### :tags (array)
                                                   # Output:
                                                   ## Collection of created screenshots
```

## Update screenshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-screenshot-put)

```ruby
@client.update_screenshot(project_id, screenshot_id, params = {}) # Input:
                                                                  ## project_id (string, required)
                                                                  ## screenshot_id (string, required)
                                                                  ## params (hash)
                                                                  ### :title (string)
                                                                  ### :description (string)
                                                                  ### :key_ids (array) - attach the screenshot to key IDs specified
                                                                  ### :tags (array)
                                                                  # Output:
                                                                  ## Updated screenshot
```

Alternatively:

```ruby
screenshot = @client.screenshot('project_id', 'screen_id')
screenshot.update(params)
```

## Delete screenshot

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-screenshot-delete)

```ruby
@client.destroy_screenshot(project_id, screenshot_id)   # Input:
                                                        ## project_id (string, required)
                                                        ## screenshot_id (string, required)
                                                        # Output:
                                                        ## Hash with the project id and "screenshot_deleted" set to "true"
```

Alternatively:

```ruby
screenshot = @client.screenshot('project_id', 'screen_id')
screenshot.destroy
```
