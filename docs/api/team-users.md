---
---
# Team users

[Team user attributes](https://developers.lokalise.com/reference/teamusers-object)

## Fetch team users

[API doc](https://developers.lokalise.com/reference/list-all-team-users)

```js
const team_users = await lokaliseApi.teamUsers().list({
  team_id: team_id,
  page: 3,
  limit: 1,
});

team_users.items[0].user_id;
```

## Fetch a single team user

[API doc](https://developers.lokalise.com/reference/retrieve-a-team-user)

```js
const team_user = await lokaliseApi.teamUsers().get(user_id, {team_id: team_id});

team_user.email;
```

## Update team user

[API doc](https://developers.lokalise.com/reference/update-a-team-user)

```js
const team_user = await lokaliseApi.teamUsers().update(
  user_id,
  {role: 'admin'},
  {team_id: team_id}
);

team_user.user_id;
```

## Delete team user

[API doc](https://developers.lokalise.com/reference/delete-a-team-user)

```js
const response = await lokaliseApi.teamUsers().delete(user_id, {team_id: team_id});

response.team_user_deleted;
```
