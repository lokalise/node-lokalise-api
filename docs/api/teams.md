# Teams

[Team attributes](https://developers.lokalise.com/reference/teams-object)

## Fetch teams

[API doc](https://developers.lokalise.com/reference/list-all-teams)

```js
const teams = await lokaliseApi.teams().list({ page: 2, limit: 1 });

teams.items[0].team_id;
```
