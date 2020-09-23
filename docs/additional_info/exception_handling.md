# Exception handling

## Error codes

[Error codes used by the API](https://app.lokalise.com/api2docs/curl/#resource-errors)

The gem may raise the following custom exceptions:

* `Lokalise::Error::BadRequest` (`400`) - the provided request incorrect
* `Lokalise::Error::Unauthorized` (`401`) - token is missing or incorrect
* `Lokalise::Error::Forbidden` (`403`) - authenticated user does not have sufficient rights to perform the desired action
* `Lokalise::Error::NotFound` (`404`) - the provided endpoint (resource) cannot be found
* `Lokalise::Error::MethodNowAllowed` (`405`) - HTTP request with the provided verb is not supported by the endpoint
* `Lokalise::Error::NotAcceptable` (`406`) - posted resource is malformed
* `Lokalise::Error::Conflict` (`409`) - request conflicts with another request
* `Lokalise::Error::Locked` (`423`) - your token is used simultaneously in multiple requests
* `Lokalise::Error::TooManyRequests` (`429`)
* `Lokalise::Error::ServerError` (`500`)
* `Lokalise::Error::BadGateway` (`502`)
* `Lokalise::Error::ServiceUnavailable` (`503`)
* `Lokalise::Error::GatewayTimeout` (`504`)

## API Rate Limits

Lokalise does not [rate-limit API requests](https://app.lokalise.com/api2docs/curl/#resource-rate-limits), however retain a right to decline the service in case of excessive use. Only one concurrent request per token is allowed. To ensure data consistency, it is not recommended to access the same project simultaneously using multiple tokens.
