---
---
# Content units

## List content units

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-items-itemid-content-units-1)

```js
const contentUnits = await lokaliseVantageApi
  .contentUnits()
  .list({ project_id, item_id });

const contentUnit = contentUnits.items[0];
contentUnit.type; // "TEXT"
contentUnit.key; // "tu1"
```