# Glossary terms

## List glossary terms

[API doc](https://developers.lokalise.com/reference/list-glossary-terms)

```js
const terms = await lokaliseApi.glossaryTerms().list({
  project_id: projectId,
  limit: 3,
});

terms.items.length; // 3
terms.items[0].id; // 1234
terms.items[0].term; // "router"
```

## Fetch a glossary term

[API doc](https://developers.lokalise.com/reference/retrieve-a-glossary-term)

```js
const termId = 1234;

const termObject = await lokaliseApi.glossaryTerms().get(termId, {
  project_id: projectId,
});

termObject.id; // 1234
termObject.term; // "router"
termObject.description; // "A network device"
```

## Create glossary terms

[API doc](https://developers.lokalise.com/reference/create-glossary-terms)

```js
const term_params = {
  terms: [
    {
      term: "my term",
      description: "my description",
      caseSensitive: false,
      forbidden: false,
      translatable: true,
    },
  ],
};

const terms = await lokaliseApi
  .glossaryTerms()
  .create(term_params, { project_id: projectId });

terms.items[0].term; // "my term"
```

## Update glossary terms

[API doc](https://developers.lokalise.com/reference/update-glossary-terms)

```js
const term_params = {
  terms: [
    {
      id: 12345,
      term: "my term updated",
      description: "description updated",
    },
  ],
};

const terms = await lokaliseApi
  .glossaryTerms()
  .update(term_params, { project_id: projectId });

terms.items[0].term; // "test updated"
```

## Delete glossary terms

[API doc](https://developers.lokalise.com/reference/delete-glossary-terms)

```js
const term_ids = [12345, 3343];

const termsDeleted = await lokaliseApi
  .glossaryTerms()
  .delete(term_ids, { project_id: projectId });

termsDeleted.deleted.count; // 1
termsDeleted.deleted.ids; // [12345]
termsDeleted.failed[0].message; // 'Term IDs not found'
```