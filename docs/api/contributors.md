# Contributors

## Fetch contributors

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-contributors-get)

```ruby
@client.contributors(project_id, params = {})   # Input:
                                                ## project_id (string, required)
                                                ## params (hash)
                                                ### :page and :limit
                                                # Output:
                                                ## Collection of contributors in the given project
```

## Fetch a single contributor

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-contributor-get)

```ruby
@client.contributor(project_id, contributor_id)   # Input:
                                                  ## project_id (string, required)
                                                  ## contributor_id (string, required) - named as "user_id" in the response
                                                  # Output:
                                                  ## Contributor in the given project
```

## Create contributors

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-contributors-post)

```ruby
@client.create_contributors(project_id, params)  # Input:
                                                 ## project_id (string, required)
                                                 ## params (array of hashes or hash, required) - parameters for the newly created contributors. Pass array of hashes to create multiple contributors, or a hash to create a single contributor
                                                 ### :email (string, required)
                                                 ### :fullname (string)
                                                 ### :is_admin (boolean)
                                                 ### :is_reviewer (boolean)
                                                 ### :languages (array of hashes, required if "is_admin" set to false) - possible languages attributes:
                                                 #### :lang_iso (string, required)
                                                 #### :is_writable (boolean)
                                                 ### :admin_rights (array)
                                                 # Output:
                                                 ## Collection of newly created contributors
```

## Update contributor

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-contributor-put)

```ruby
@client.update_contributor(project_id, contributor_id, params)   # Input:
                                                                 ## project_id (string, required)
                                                                 ## contributor_id (string, required)
                                                                 ## params (hash, required)
                                                                 ### :is_admin (boolean)
                                                                 ### :is_reviewer (boolean)
                                                                 ### :languages (array of hashes) - possible languages attributes:
                                                                 #### :lang_iso (string, required)
                                                                 #### :is_writable (boolean)
                                                                 ### :admin_rights (array)
                                                                 # Output:
                                                                 ## Updated contributor
```

Alternatively:

```ruby
contributor = @client.contributor('project_id', 'contributor_id')
contributor.update(params)
```

## Delete contributor

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-contributor-delete)

```ruby
@client.destroy_contributor(project_id, contributor_id)    # Input:
                                                           ## project_id (string, required)
                                                           ## contributor_id (string, required)
                                                           # Output:
                                                           ## Hash with the project's id and "contributor_deleted"=>true
```

Alternatively:

```ruby
contributor = @client.contributor('project_id', 'id')
contributor.destroy
```
