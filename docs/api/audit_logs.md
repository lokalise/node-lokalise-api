---
---

# Audit logs

## List audit logs

[API doc](https://developers.lokalise.com/reference/list-audit-logs)

**This endpoint is only available through API version `v1`. Make sure to specify the version when initializing the client.**

```js
const lokaliseApi = new LokaliseApi({
  apiKey: process.env.API_KEY,
  version: "v1", // important!
});

const auditLogs = await lokaliseApi.auditLogs().list({
  limit: 100,
  event_type: "project.deleted",
});

auditLogs.items[0].metadata.event_code;
auditLogs.next_cursor;
auditLogs.has_more;
```

To fetch the next page, pass `next_cursor` as the `cursor` parameter:

```js
const nextPage = await lokaliseApi.auditLogs().list({
  limit: 100,
  cursor: auditLogs.next_cursor,
});
```