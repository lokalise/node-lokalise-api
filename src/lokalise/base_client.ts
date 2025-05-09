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
		requestTimeout: undefined,
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
	}: ClientParams) {
		if (typeof apiKey !== "string" || apiKey.trim().length === 0) {
			throw new Error(
				"Instantiation failed: A non-empty API key or JWT must be provided.",
			);
		}

		this.clientData.token = apiKey;
		this.clientData.enableCompression = enableCompression;
		this.clientData.silent = silent;
		this.clientData.tokenType = tokenType;
		this.clientData.host = host;
		this.clientData.requestTimeout = requestTimeout;
	}
}
