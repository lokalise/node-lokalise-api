# Projects

[Project attributes](https://app.lokalise.com/api2docs/curl/#object-projects)

## Fetch projects

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-projects-get)

```ruby
@client.projects(params = {})   # Input:
                                ## params (hash)
                                ### :filter_team_id (string) - load projects only for the given team
                                ### :page and :limit
                                # Output:
                                ## Collection of projects under the `projects` attribute
```

## Fetch a single project

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-project-get)

```ruby
@client.project(project_id)     # Input:
                                ## project_id (string, required)
                                # Output:
                                ## A single project
```

## Create a project

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-project-post)

```ruby
@client.create_project(params)  # Input:
                                ## params (hash, required)
                                ### name (string, required)
                                ### description (string)
                                ### team_id (integer) - you must be an admin of the chosen team. When omitted, defaults to the current team of the token's owner
                                # Output:
                                ## A newly created project

```

## Update a project

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-project-put)

```ruby
@client.update_project(project_id, params)  # Input:
                                            ## project_id (string, required)
                                            ## params (hash, required)
                                            ### name (string, required)
                                            ### description (string)
                                            # Output:
                                            ## An updated project
```

Alternatively:

```ruby
project = @client.project('project_id')
project.update(params)
```

## Empty a project

[Doc](https://app.lokalise.com/api2docs/curl/#transition-empty-a-project-put)

Deletes *all* keys and translations from the project.

```ruby
@client.empty_project(project_id)   # Input:
                                    ## project_id (string, required)
                                    # Output:
                                    ## A project containing its id and a `keys_deleted => true` attribute
```

Alternatively:

```ruby
project = @client.project('project_id')
project.empty
```

## Delete a project

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-project-delete)

```ruby
@client.destroy_project(project_id)   # Input:
                                      ## project_id (string, required)
                                      # Output:
                                      ## A project containing its id and a `project_deleted => true` attribute
```

Alternatively:

```ruby
project = @client.project('project_id')
project.destroy
```
