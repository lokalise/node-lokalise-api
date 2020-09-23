# Team users

[Team user attributes](https://app.lokalise.com/api2docs/curl/#object-team-users)

## Fetch team users

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-team-users-get)

```ruby
@client.team_users(team_id, params = {})  # Input:
                                          ## team_id (string, required)
                                          ## params (hash)
                                          ### :page and :limit
                                          # Output:
                                          ## Collection of team users
```

## Fetch a single team user

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-team-user-get)

```ruby
@client.team_user(team_id, user_id) # Input:
                                    ## team_id (string, required)
                                    ## user_id (string, required)
                                    # Output:
                                    ## Team user
```

## Update team user

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-team-user-put)

```ruby
@client.update_team_user(team_id, user_id, params)  # Input:
                                                    ## team_id (string, required)
                                                    ## user_id (string, required)
                                                    ## params (hash, required):
                                                    ### :role (string, required) - :owner, :admin, or :member
                                                    # Output:
                                                    ## Updated team user
```

Alternatively:

```ruby
user = @client.team_user('team_id', 'user_id')
user.update(params)
```

## Delete team user

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-team-user-delete)

```ruby
@client.destroy_team_user(team_id, user_id) # Input:
                                            ## team_id (string, required)
                                            ## user_id (string, required)
                                            # Output:
                                            ## Hash with "team_id" and "team_user_deleted" set to "true"
```

Alternatively:

```ruby
user = @client.team_user('team_id', 'user_id')
user.destroy
```
