## Handling API errors

The Lokalise Vantage API returns structured errors containing a message, an error code, and optional details. The SDK converts these responses into `ApiErrorVantage` instances, allowing you to inspect errors and handle specific cases.

### The ApiErrorVantage class

An `ApiErrorVantage` instance provides the following properties:

| Property | Type | Description |
|---|---|---|
| `message` | `string` | Human-readable error message. |
| `code` | `string` | Machine-readable error code, such as `VALIDATION_ERROR` or `ACCESS_DENIED`. |
| `details` | `Record<string, unknown> \| undefined` | Additional error information returned by the API. |
| `validationErrors` | `VantageValidationError[] \| undefined` | Individual validation issues, when available. |

The original error details are preserved, including any properties that the SDK does not explicitly recognize.

### Handling validation errors

When a request contains invalid parameters, the API may return a `VALIDATION_ERROR`. For example, passing an incorrectly formatted import ID can produce a validation issue with the message `Invalid GUID`.

The SDK exposes recognized validation issues through the `validationErrors` property, so you don't need to manually parse the nested `details.error` array.

```ts
import { ApiErrorVantage, LokaliseApiVantage } from "@lokalise/node-api";

const api = new LokaliseApiVantage({
  apiKey: process.env.LOKALISE_API_TOKEN!,
});

try {
  await api.translationStatuses().get({
    project_id: "your-project-id",
    import_id: "invalid-import-id",
  });
} catch (error) {
  if (error instanceof ApiErrorVantage) {
    console.error(error.code, error.message);

    for (const issue of error.validationErrors ?? []) {
      console.error(`${issue.instancePath}: ${issue.message}`);
    }
  } else {
    throw error;
  }
}
```

For an invalid import ID, the validation issue might contain:

```json
{
  "keyword": "invalid_format",
  "instancePath": "/importId",
  "schemaPath": "#/importId/invalid_format",
  "message": "Invalid GUID",
  "params": {
    "origin": "string",
    "format": "guid"
  }
}
```

Each validation issue can include:

- `keyword`: The validation rule that failed.
- `instancePath`: The location of the invalid field in the request.
- `schemaPath`: The corresponding validation rule in the schema.
- `message`: A human-readable description of the issue, when provided.
- `params`: Additional information about the failed validation rule.

The `validationErrors` property is optional. It is populated only when the API returns a `VALIDATION_ERROR` with recognized validation entries. Other error formats remain accessible through `details`.

### Handling multiple API errors

Some Vantage API responses contain an `errors` array instead of a single error object. When the SDK encounters valid entries in this array, it throws a standard JavaScript `AggregateError` containing individual `ApiErrorVantage` instances.

You can handle both single and multiple errors:

```ts
import { ApiErrorVantage } from "@lokalise/node-api";

try {
  // Make a Vantage API request.
} catch (error) {
  if (error instanceof AggregateError) {
    for (const item of error.errors) {
      if (item instanceof ApiErrorVantage) {
        console.error(`${item.code}: ${item.message}`);
        console.error(item.details);
      }
    }
  } else if (error instanceof ApiErrorVantage) {
    console.error(`${error.code}: ${error.message}`);
    console.error(error.details);
  } else {
    throw error;
  }
}
```

Each nested error retains its own code, message, and optional details. If an individual error contains recognized validation issues, you can also access its `validationErrors` property.

### Unexpected error responses

If the API returns an error response that does not match the expected structure, the SDK creates an `ApiErrorVantage` with the code `unknown_error`.

Its details include the HTTP response status and the reason `unexpected response format`.

You can inspect these details when diagnosing unexpected API responses.

**Note:** Not every failed request produces an `ApiErrorVantage`. Network failures and other client-side errors may have different types. When handling exceptions, check their type before accessing API-specific properties.