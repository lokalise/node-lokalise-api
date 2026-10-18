---
---
# Segments

## List segments

[API doc](https://developers.lokalise.com/reference/get_v1-projects-projectid-content-units-contentunitid-segments-1)

```js
const segments = await lokaliseVantageApi
  .segments()
  .list({ project_id, content_unit_id });

segments.items[0].value; // "My segment value"
```

## Update segment

[API doc](https://developers.lokalise.com/reference/patch_v1-projects-projectid-segments-segmentid)

```js
const params = { project_id, segment_id };
const body = { status: "PENDING_REVIEW" as const };

const result = await lokaliseVantageApi.segments().update(params, body);

result.data.status; // "PENDING_REVIEW"
result.data.lastChangeSource; // "AI"
```