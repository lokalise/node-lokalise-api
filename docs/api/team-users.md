# Team users

[Team user attributes](https://app.lokalise.com/api2docs/curl/#object-team-users)

## Fetch team users

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-team-users-get)

```js
lokaliseApi.teamUsers.list({team_id: team_id});
```

## Fetch a single team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-team-user-get)

```js
lokaliseApi.teamUsers.get(user_id, {team_id: team_id});
```

## Update team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-team-user-put)

```js
lokaliseApi.teamUsers.update(
  user_id,
  {role: 'admin'},
  {team_id: team_id}
);
```

## Delete team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-team-user-delete)

```js
lokaliseApi.teamUsers.delete(user_id, {team_id: team_id});
```
