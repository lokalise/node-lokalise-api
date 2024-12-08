import type { ClientData as ClientDataInterface } from "../interfaces/client_data.js";

/**
 * Parameters used to configure a BaseClient instance.
 */
export type ClientParams = {
	/**
	 * The API key for authenticating requests. This must be provided.
	 */
	apiKey?: string;

	/**
	 * Whether to enable response compression (e.g., gzip).
	 * Defaults to `false` if not specified.
	 */
	enableCompression?: boolean;

	/**
	 * The type of token used for authentication, e.g. "Bearer".
	 * If omitted, the token will be used as-is.
	 */
	tokenType?: string;

	/**
	 * The base host URL for requests. If not provided, a default may be used downstream.
	 */
	host?: string;

	/**
	 * API version. Defaults to "api2" if not specified elsewhere.
	 */
	version?: string;

	/**
	 * Request timeout in milliseconds. If not provided, requests have no explicit timeout.
	 */
	requestTimeout?: number;
};

/**
 * A foundational client class that establishes authentication and configuration data.
 * Other specialized clients can inherit from this class to leverage the configured
 * authentication, compression, host, and timeout settings.
 */
export class BaseClient {
	/**
	 * Internal client data including token, token type, host, compression, and timeouts.
	 */
	readonly clientData: ClientDataInterface = {
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
		const { apiKey } = params;
		if (!apiKey || apiKey.trim().length === 0) {
			throw new Error(
				"Instantiation failed: A non-empty API key must be provided.",
			);
		}

		this.clientData.token = apiKey;
		this.clientData.enableCompression = params.enableCompression ?? false;
		this.clientData.tokenType = params.tokenType ?? "";
		this.clientData.host = params.host;
		this.clientData.requestTimeout = params.requestTimeout;
	}
}
