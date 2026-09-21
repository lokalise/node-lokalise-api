---
---
# Translation memories

## List translation memories

[API doc](https://developers.lokalise.com/reference/list-project-translation-memories)

```js
const tms = await lokaliseApi.translationMemories().list({
  project_id: projectId,
});

tms[0].name // "Lokalise Translation Memory"
tms[1].id // 1234
```