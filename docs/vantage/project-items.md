---
---
# Project items

## List project items

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-items-1)

```js
const projectItems = await lokaliseVantageApi
  .projectItems()
  .list({ project_id });

projectItems.items[0].name; // "sample.md"
```