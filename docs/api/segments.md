# Segments

[Segment attributes](https://app.lokalise.com/api2docs/curl/#object-segments)

## Fetch segments

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-segments-for-key-language-get)

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

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-segment-for-key-language-get)

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

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-segment-put)

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