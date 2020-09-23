# Tasks

[Task attributes](https://app.lokalise.com/api2docs/curl/#resource-tasks)

## Fetch tasks

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-tasks-get)

```ruby
@client.tasks(project_id, params = {})  # Input:
                                        ## project_id (string, required)
                                        ## params (hash)
                                        ### :filter_title (string) - set title filter for the list
                                        ### :page and :limit
                                        # Output:
                                        ## Collection of tasks for the project
```

## Fetch a single task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-task-get)

```ruby
@client.task(project_id, task_id, params = {})  # Input:
                                                ## project_id (string, required)
                                                ## task_id (string, required)
                                                # Output:
                                                ## Single task for the project
```

## Create task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-task-post)

```ruby
@client.create_task(project_id, params)  # Input:
                                         ## project_id (string, required)
                                         ## params (hash, required)
                                         ### title (string, required)
                                         ### keys (array) - translation key ids. Required if "parent_task_id" is not specified
                                         ### languages (array of hashes, required)
                                         #### language_iso (string)
                                         #### users (array) - list of users identifiers, assigned to work on the language
                                         ### Find other supported options at https://app.lokalise.com/api2docs/curl/#transition-create-a-task-post
                                         # Output:
                                         ## A newly created task

```

## Update task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-task-put)

```ruby
@client.update_task(project_id, task_id, params = {})  # Input:
                                                       ## project_id (string, required)
                                                       ## task_id (string or integer, required)
                                                       ## params (hash)
                                                       ### Find supported params at https://app.lokalise.com/api2docs/curl/#transition-update-a-task-put
                                                       # Output:
                                                       ## An updated task

```

Alternatively:

```ruby
task = @client.task('project_id', 'task_id')
task.update(params)
```

## Delete task

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-task-delete)

```ruby
@client.destroy_task(project_id, task_id)  # Input:
                                           ## project_id (string, required)
                                           ## task_id (string, required)
                                           # Output:
                                           ## Hash with the project id and "task_deleted" set to "true"

```

Alternatively:

```ruby
task = @client.task('project_id', 'task_id')
task.destroy
```
