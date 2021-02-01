# Team users

[Team user attributes](https://app.lokalise.com/api2docs/curl/#object-team-users)

## Fetch team users

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-team-users-get)

```js
const team_users = await lokaliseApi.teamUsers.list({
  team_id: team_id,
  page: 3,
  limit: 1,
});

team_users.items[0].user_id;
```

## Fetch a single team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-team-user-get)

```js
const team_user = await lokaliseApi.teamUsers.get(user_id, {team_id: team_id});

team_user.email;
```

## Update team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-team-user-put)

```js
const team_user = await lokaliseApi.teamUsers.update(
  user_id,
  {role: 'admin'},
  {team_id: team_id}
);

team_user.user_id;
```

## Delete team user

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-team-user-delete)

```js
const response = await lokaliseApi.teamUsers.delete(user_id, {team_id: team_id});

response.team_user_deleted;
```
