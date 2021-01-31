# Teams

## Fetch teams

[API doc](https://app.lokalise.com/api2docs/curl/#resource-teams)

```js
const teams = await lokaliseApi.teams.list({ page: 2, limit: 1 });

teams.items[0].team_id;
```
