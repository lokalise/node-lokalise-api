---
---
# Translation keys

[Key attributes](https://developers.lokalise.com/reference/key-object)

## Fetch project keys

[API doc](https://developers.lokalise.com/reference/list-all-keys)

**This endpoint also supports cursor pagination which is now a recommended approach, especially for fetching large amounts of data. Please [learn more in the Pagination docs]({{ 'api/getting-started#cursor-pagination' | relative_url }}).**

```js
const keys = await lokaliseApi.keys().list({
  project_id: project_id,
  page: 2,
  limit: 3,
});

keys.items[0].key_id;
```

## Fetch a single project key

[API doc](https://developers.lokalise.com/reference/retrieve-a-key)

```js
const key = await lokaliseApi.keys().get(key_id, {
  project_id: project_id,
  disable_references: 1,
});

key.key_name.ios;
```

## Create project keys

[API doc](https://developers.lokalise.com/reference/create-keys)

```js
const keys = await lokaliseApi.keys().create(
  {
    keys: [
      {
        key_name: "welcome_web",
        description: "Index app welcome",
        platforms: ["web"],
        filenames: {
          web: "my_filename.json",
        },
        translations: [
          {
            language_iso: "en",
            translation: "Welcome",
          },
        ],
      },
      {
        key_name: "welcome_ios",
        description: "Welcome apple",
        platforms: ["ios"],
        is_plural: true,
        translations: [
          {
            language_iso: "en",
            translation: {
              one: "I have one apple",
              other: "I have a lot of apples",
            },
          },
        ],
      },
    ],
  },
  { project_id: project_id }
);

keys.items[0].platforms;
keys.errors[0].message; // If some keys were not created, the errors will be listed here
```

Creating a key with per-platform names:

```js
const keys = await lokaliseApi.keys().create(
  {
    keys: [
      {
        key_name: {
          ios: "name_for_ios",
          web: "name_for_web",
          android: "android_name",
          other: "other_name",
        },
        platforms: ["web", "ios"],
        translations: [
          {
            language_iso: "en",
            translation: "Per-platform key names",
          },
        ],
      },
    ],
  },
  { project_id: project_id }
);
```

Things to note:

* "Per-platform key names" option must be enabled in the project settings
* You have to provide key names for all four platform (`ios`, `web`, `android`, `other`) even if the key does not belong to all of them

## Update project key

[API doc](https://developers.lokalise.com/reference/update-a-key)

```js
const key = await lokaliseApi.keys().update(key_id, {
  "platforms": ["web", "other"],
  "description": "Node updated"
}, { project_id: project_id });

key.platforms;
```

## Bulk update project keys

[API doc](https://developers.lokalise.com/reference/bulk-update)

```js
const keys = await lokaliseApi.keys().bulk_update(
  {
    keys: [
      {
        key_id: key_id,
        description: "Bulk node",
        platforms: ["web"],
      },
      {
        key_id: second_key_id,
        description: "Second bulk",
      },
    ],
  },
  { project_id: project_id }
);

keys.items[0].key_id;
keys.errors;
```

## Delete project key

[API doc](https://developers.lokalise.com/reference/delete-a-key)

```js
const response = await lokaliseApi.keys().delete(key_id, { project_id: project_id });

response.key_removed;
```

## Bulk delete project keys

[API doc](https://developers.lokalise.com/reference/delete-multiple-keys)

```js
const response = await lokaliseApi.keys().bulk_delete([
  key_id, second_key_id
], { project_id: project_id });

response.key_removed;
```
