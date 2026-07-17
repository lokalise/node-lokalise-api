---
---

# Audit logs

## List audit logs

[API doc](https://developers.lokalise.com/reference/list-audit-logs)

This endpoint belongs to the new API version `v1`. Use the `LokaliseApiV1` client for Audit Logs and other endpoints introduced under this API version.

```js
const lokaliseApi = new LokaliseApiV1({
  apiKey: process.env.API_KEY,
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