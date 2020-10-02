# Team user groups

[Team user group attributes](https://app.lokalise.com/api2docs/curl/#object-team-user-groups)

## Fetch team user groups

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-groups-get)

```js
lokaliseApi.userGroups.list({team_id: team_id});
```

## Fetch a single group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-group-get)

```js
lokaliseApi.userGroups.get(group_id, {team_id: team_id});
```

## Create group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-group-post)

```js
lokaliseApi.userGroups.create(
  {
    name: 'Node',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);
```

## Update group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-group-put)

```js
lokaliseApi.userGroups.update(
  group_id,
  {
    name: 'Node updated',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);
```

## Add projects to group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-add-projects-to-group-put)

```js
lokaliseApi.userGroups.add_projects_to_group(
  team_id,
  group_id,
  [project_id]
);
```

## Remove projects from group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-remove-projects-from-group-put)

```js
lokaliseApi.userGroups.remove_projects_from_group(
  team_id,
  group_id,
  [project_id]
);
```

## Add users to group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-add-members-to-group-put)

```js
lokaliseApi.userGroups.add_members_to_group(
  team_id,
  group_id,
  [user_id]
);
```

## Remove users from group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-remove-members-from-group-put)

```js
lokaliseApi.userGroups.remove_members_from_group(
  team_id,
  group_id,
  [user_id]
);
```

## Destroy group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-group-delete)

```js
lokaliseApi.userGroups.delete(new_group_id, {team_id: team_id});
```
