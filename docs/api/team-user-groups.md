# Team user groups

[Team user group attributes](https://app.lokalise.com/api2docs/curl/#object-team-user-groups)

## Fetch team user groups

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-groups-get)

```js
const user_groups = await lokaliseApi.userGroups().list({
  team_id: team_id,
  page: 2,
  limit: 1,
});

user_groups.items[0].group_id;
```

## Fetch a single group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-group-get)

```js
const user_group = await lokaliseApi.userGroups().get(group_id, {team_id: team_id});

user_group.group_id;
```

## Create group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-a-group-post)

```js
const user_group = await lokaliseApi.userGroups().create(
  {
    name: 'Node',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);

user_group.name;
```

## Update group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-group-put)

```js
const user_group = await lokaliseApi.userGroups().update(
  group_id,
  {
    name: 'Node updated',
    is_reviewer: false,
    is_admin: true,
    admin_rights: ['upload']
  },
  {team_id: team_id}
);

user_group.permissions.is_admin;
```

## Add projects to group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-add-projects-to-group-put)

```js
const user_group = await lokaliseApi.userGroups().add_projects_to_group(
  team_id,
  group_id,
  [project_id]
);

user_group.projects;
```

## Remove projects from group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-remove-projects-from-group-put)

```js
const user_group = await lokaliseApi.userGroups().remove_projects_from_group(
  team_id,
  group_id,
  [project_id]
);

user_group.group_id;
```

## Add users to group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-add-members-to-group-put)

```js
const user_group = await lokaliseApi.userGroups().add_members_to_group(
  team_id,
  group_id,
  [user_id]
);

user_group.members;
```

## Remove users from group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-remove-members-from-group-put)

```js
const user_group = await lokaliseApi.userGroups().remove_members_from_group(
  team_id,
  group_id,
  [user_id]
);

user_group.members;
```

## Destroy group

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-group-delete)

```js
const response = await lokaliseApi.userGroups().delete(new_group_id, {team_id: team_id});

response.group_deleted;
```
