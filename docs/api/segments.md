---
---
# Segments

## Fetch segments

[API doc](https://developers.lokalise.com/reference/list-all-segments-for-key-language)

```js
const segments = await lokaliseApi.segments().list({
  project_id: '123.abc',
  key_id: 12345,
  language_iso: "en",
  disable_references: 1,
  filter_unverified: 0,
});
```

## Fetch a single segment

[API doc](https://developers.lokalise.com/reference/retrieve-a-segment-for-key-language)

```js
const segment_number = 2;

const segment = await lokaliseApi.segments().get(segment_number, {
  project_id: '123.abc',
  key_id: 12345,
  language_iso: "en",
  disable_references: 0,
});
```

## Update segment

[API doc](https://developers.lokalise.com/reference/update-a-segment)

```js
const segment_number = 2;

const segment = await lokaliseApi.segments().update(
  segment_number,
  {
    value: "Hello!",
    is_fuzzy: true,
  },
  { project_id: '123.abc', key_id: 12345, language_iso: "en" }
);
```