# Translation keys

[Key attributes](https://app.lokalise.com/api2docs/curl/#object-keys)

## Fetch project keys

[API doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-keys-get)

```js
lokaliseApi.keys.list({project_id: project_id});
```

## Fetch a single project key

[API doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-key-get)

```js
lokaliseApi.keys.get(key_id, {project_id: project_id});
```

## Create project keys

[API doc](https://app.lokalise.com/api2docs/curl/#transition-create-keys-post)

```js
lokaliseApi.keys.create([
  {
    "key_name": "welcome_web",
    "description": "Index app welcome",
    "platforms": ["web"],
    "filenames": {
      "web": "my_filename.json"
    },
    "translations": [
      {
        "language_iso": "en",
        "translation": "Welcome"
      }
    ]
  },
  {
    "key_name": "welcome_ios",
    "description": "Welcome apple",
    "platforms": ["ios"],
    "is_plural": true,
    "translations": [
      {
        "language_iso": "en",
        "translation": {
          "one": "I have one apple",
          "other": "I have a lot of apples"
        }
      }
    ]
  }
], {project_id: project_id});
```

Creating a key with per-platform names:

```js
lokaliseApi.keys.create(
  [{
    key_name: {
      ios: "name_for_ios",
      web: "name_for_web",
      android: "android_name",
      other: "other_name"
    },
    platforms: ["web", "ios"],
    translations: [{
      language_iso: "en",
      translation: "Per-platform key names"
    }],
  }],
  { project_id: project_id }
);
```

Things to note:

* "Per-platform key names" option must be enabled in the project settings
* You have to provide key names for all four platform (`ios`, `web`, `android`, `other`) even if the key does not belong to all of them

## Update project key

[API doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-key-put)

```js
lokaliseApi.keys.update(key_id, {
  "platforms": ["web", "other"],
  "description": "Node updated"
}, { project_id: project_id });
```

## Bulk update project keys

[API doc](https://app.lokalise.com/api2docs/curl/#transition-bulk-update-put)

```js
lokaliseApi.keys.bulk_update([
  {
    "key_id": key_id,
    "description": "Bulk node",
    "platforms": ["web"]
  },
  {
    "key_id": second_key_id,
    "description": "Second bulk",
  }
], { project_id: project_id});
```

## Delete project key

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-key-delete)

```js
lokaliseApi.keys.delete(key_id, { project_id: project_id });
```

## Bulk delete project keys

[API doc](https://app.lokalise.com/api2docs/curl/#transition-delete-multiple-keys-delete)

```js
lokaliseApi.keys.bulk_delete([
  key_id, second_key_id
], { project_id: project_id });
```
