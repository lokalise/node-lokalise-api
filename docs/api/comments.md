# Comments

[Comments attributes](https://app.lokalise.com/api2docs/curl/#resource-comments)

## Fetch project comments

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-project-comments-get)

```ruby
@client.project_comments(project_id, params = {})   # Input:
                                                    ## project_id (string, required)
                                                    ## params (hash)
                                                    ### :page and :limit
                                                    # Output:
                                                    ## Collection of comments available in the given project
```

## Fetch key comments

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-key-comments-get)

```ruby
@client.comments(project_id, key_id, params = {})   # Input:
                                                    ## project_id (string, required)
                                                    ## key_id (string, required)
                                                    ## params (hash)
                                                    ### :page and :limit
                                                    # Output:
                                                    ## Collection of comments available for the specified key in the given project
```

## Create key comments

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-comments-post)

```ruby
@client.create_comments(project_id, key_id, params)   # Input:
                                                      ## project_id (string, required)
                                                      ## key_id (string, required)
                                                      ## params (array or hash, required) - contains parameter of newly created comments. Pass array of hashes to create multiple comments, or a hash to create a single comment
                                                      ### :comment (string, required)
                                                      # Output:
                                                      ## Newly created comment
```

## Fetch key comment

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-comment-get)

```ruby
@client.comment(project_id, key_id, comment_id)   # Input:
                                                  ## project_id (string, required)
                                                  ## key_id (string, required)
                                                  ## comment_id (string, required)
                                                  # Output:
                                                  ## Comment for the key in the given project
```

## Delete key comment

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-comment-delete)

```ruby
@client.destroy_comment(project_id, key_id, comment_id)   # Input:
                                                          ## project_id (string, required)
                                                          ## key_id (string, required)
                                                          ## comment_id (string, required)
                                                          # Output:
                                                          ## Hash with the project's id and "comment_deleted"=>true
```

Alternatively:

```ruby
comment = @client.comment('project_id', 'comment_id')
comment.destroy
```
