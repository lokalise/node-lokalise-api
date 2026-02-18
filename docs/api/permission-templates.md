---
---
# Permission templates

## Fetch permission templates

[API doc](https://developers.lokalise.com/reference/list-all-permission-templates)

```js
const roles = await lokaliseApi.permissionTemplates().list({
  team_id: 12345,
});

const roleDetails = roles.items[0];

roleDetails.id // => 1
roleDetails.role // => "Manager"
roleDetails.tag // => "Full access"
```