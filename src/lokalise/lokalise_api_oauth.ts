import { type ClientParams, LokaliseApi } from "./lokalise_api.js";

/**
 * A specialized client for interacting with the Lokalise API using OAuth authentication.
 * Extends `LokaliseApi` and configures the token type and authorization header to use Bearer tokens.
 */
export class LokaliseApiOAuth extends LokaliseApi {
	/**
	 * Constructs a new LokaliseApiOAuth client instance.
	 * @param params - Configuration parameters including `apiKey` (OAuth token)
	 *                 and optionally `tokenType` (defaults to "Bearer").
	 * @throws Error If `apiKey` is missing or empty.
	 */
	constructor(params: ClientParams) {
		super(params);

		// Default to "Bearer" if tokenType not provided.
		this.clientData.tokenType = params.tokenType ?? "Bearer";

		// For OAuth, the header should be `Authorization`.
		this.clientData.authHeader = "Authorization";
	}
}
