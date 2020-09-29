# Translation keys

[Key attributes](https://app.lokalise.com/api2docs/curl/#object-keys)

## Fetch project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-list-all-keys-get)

```js
lokaliseApi.keys.list({project_id: project_id});
```

## Fetch a single project key

[Doc](https://app.lokalise.com/api2docs/curl/#transition-retrieve-a-key-get)

```js
lokaliseApi.keys.get(key_id, {project_id: project_id});
```

## Create project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-create-keys-post)

```js
lokaliseApi.keys.create([
  {
    "key_name": "welcome_web",
    "description": "Index app welcome",
    "platforms": ["web"],
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

## Update project key

[Doc](https://app.lokalise.com/api2docs/curl/#transition-update-a-key-put)

```js
lokaliseApi.keys.update(key_id, {
  "platforms": ["web", "other"],
  "description": "Node updated"
}, { project_id: project_id });
```

## Bulk update project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-bulk-update-put)

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

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-a-key-delete)

```js
lokaliseApi.keys.delete(key_id, { project_id: project_id });
```

## Bulk delete project keys

[Doc](https://app.lokalise.com/api2docs/curl/#transition-delete-multiple-keys-delete)

```js
lokaliseApi.keys.bulk_delete([
  key_id, second_key_id
], { project_id: project_id });
```
