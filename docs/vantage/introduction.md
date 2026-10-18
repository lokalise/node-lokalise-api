---
---
# Introduction

The Lokalise Vantage API provides access to projects and content in [Lokalise Vantage](https://developers.lokalise.com/reference/lokalise-vantage-api-introduction), a workspace designed for translating documents, articles, marketing materials, and other long-form content.

Vantage uses a separate API with its own endpoints and resource structure. Unlike the standard Lokalise API, which works with translation keys, Vantage organizes content into projects, items, content units, and segments.

**Please note:** The Vantage API is currently in beta.

## Getting started

The Node SDK provides a separate `LokaliseApiVantage` client for working with Vantage endpoints. You can use the same API token as with the standard Lokalise API.

Import and initialize the client:

```typescript
import { LokaliseApiVantage } from "@lokalise/node-api";

const lokaliseVantageApi = new LokaliseApiVantage({
  apiKey: "<apiKey>",
});
```

You can now make requests to the Vantage API. For example, to retrieve the projects in your team:

```typescript
const projects = await lokaliseVantageApi.projects().list({
  team_id: "your-team-uuid",
});

console.log(projects.items);
```

## Cursor-based pagination

Vantage API list endpoints use cursor-based pagination. Paginated responses are represented by `CursorPaginatedResultVantage`, which provides the following properties:

- `items` — the resources returned on the current page.
- `count` — the number of resources on the current page.
- `cursor` — the cursor to use when requesting the next page.
- `hasMore` — whether additional pages are available.

To retrieve the next page, pass the returned `cursor` as the `after` parameter:

```typescript
const firstPage = await lokaliseVantageApi.projects().list({
  team_id: "your-team-uuid",
  limit: 10,
});

console.log(firstPage.items);

if (firstPage.hasMore && firstPage.cursor) {
  const secondPage = await lokaliseVantageApi.projects().list({
    team_id: "your-team-uuid",
    limit: 10,
    after: firstPage.cursor,
  });

  console.log(secondPage.items);
}
```

Not all Vantage endpoints use pagination. For example, listing the languages of a project returns an array of languages directly.

## Additional information

Vantage uses UUIDs for resource identifiers, and its request parameters and response structures differ from those of the standard Lokalise API.

Refer to the [Vantage API documentation](https://developers.lokalise.com/reference/lokalise-vantage-api-introduction) for more information about the API, its resource model, and limitations.