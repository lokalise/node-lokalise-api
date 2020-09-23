# Branches

[Branches attributes](https://app.lokalise.com/api2docs/curl/#resource-branches)

## Fetch branches

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-branches-get)

```ruby
@client.branches(project_id, params = {})   # Input:
                                            ## project_id (string, required)
                                            ## params (hash)
                                            ### :page and :limit
                                            # Output:
                                            ## Collection of comments available in the branches project
```

## Fetch branch

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```ruby
@client.branch(project_id, branch_id)   # Input:
                                        ## project_id (string, required)
                                        ## branch_id (string or integer, required)
                                        # Output:
                                        ## Branch inside the given project
```

## Create branch

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-branch-get)

```ruby
@client.create_branch(project_id, params)   # Input:
                                            ## project_id (string, required)
                                            ## params (hash, required):
                                            ### :name (string) - name of the branch
                                            # Output:
                                            ## Created branch
```

## Update branch

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-branch-put)

```ruby
@client.update_branch(project_id, branch_id, params)    # Input:
                                                        ## project_id (string, required)
                                                        ## branch_id (string or integer, required)
                                                        ## params (hash, required):
                                                        ### :name (string) - name of the branch
                                                        # Output:
                                                        ## Updated branch
```

Alternatively:

```ruby
branch = @client.branch('project_id', 'branch_id')
branch.update params
```

## Delete branch

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-branch-delete)

```ruby
@client.destroy_branch(project_id, branch_id)   # Input:
                                                ## project_id (string, required)
                                                ## branch_id (string or integer, required)
                                                # Output:
                                                ## Hash with the project's id and "branch_deleted"=>true
```

Alternatively:

```ruby
branch = @client.branch('project_id', 'branch_id')
branch.destroy
```

## Merge branch

[Doc](https://app.lokalise.com/api2docs/curl/#transition-merge-a-branch-post)

```ruby
@client.merge_branch(project_id, branch_id, params) # Input:
                                                    ## project_id (string, required)
                                                    ## branch_id (string or integer, required)
                                                    ## params (hash)
                                                    # Output:
                                                    ## Hash with the project's id, "branch_merged"=>true, and branch attributes
```

Alternatively:

```ruby
branch = @client.branch('project_id', 'branch_id')
branch.merge params
```
