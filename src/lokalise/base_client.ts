import type { ClientData } from "../interfaces/client_data.js";
import type { ClientParams } from "../interfaces/client_params.js";
/**
 * A foundational client class that establishes authentication and configuration data.
 * Other specialized clients can inherit from this class to leverage the configured
 * authentication, compression, host, and timeout settings.
 */
export class BaseClient {
	/**
	 * Internal client data including token, token type, host, compression, and timeouts.
	 */
	readonly clientData: ClientData = {
		token: "",
		tokenType: "",
		authHeader: "x-api-token",
		enableCompression: false,
		requestTimeout: 0,
		silent: false,
	};

	/**
	 * Constructs a new BaseClient instance.
	 * @param params - Configuration parameters including API key and optional features.
	 * @throws Error if the API key is not provided or is empty.
	 */
	constructor({
		apiKey,
		enableCompression = false,
		silent = false,
		tokenType = "",
		host,
		requestTimeout,
		userAgent,
	}: ClientParams) {
		if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
			throw new Error(
				"Instantiation failed: A non-empty API key or JWT must be provided.",
			);
		}

		this.clientData = {
			token: apiKey,
			tokenType: tokenType.trim(),
			authHeader: "x-api-token",
			enableCompression,
			host,
			requestTimeout: requestTimeout ?? 0,
			silent,
			userAgent,
		};
	}
}
