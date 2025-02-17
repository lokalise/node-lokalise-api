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
	};

	/**
	 * Constructs a new BaseClient instance.
	 * @param params - Configuration parameters including API key and optional features.
	 * @throws Error if the API key is not provided or is empty.
	 */
	constructor(params: ClientParams) {
		const { apiKey, jwt } = params;
		if ((!apiKey || apiKey.trim().length === 0) && (!jwt || jwt.trim().length === 0)) {
			throw new Error(
				"Instantiation failed: A non-empty API key or JWT must be provided.",
			);
		}

		if (apiKey && apiKey.trim().length > 0) {
			this.clientData.token = apiKey;
		}

		if (jwt && jwt.trim().length > 0) {
			this.clientData.token = jwt;
			this.clientData.authHeader = "Authorization";
		}

		this.clientData.enableCompression = params.enableCompression ?? false;
		this.clientData.tokenType = params.tokenType ?? "";
		this.clientData.host = params.host;
		this.clientData.requestTimeout = params.requestTimeout;
	}
}
