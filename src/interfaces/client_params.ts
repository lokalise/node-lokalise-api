/**
 * Parameters used to configure a BaseClient instance.
 */
export type ClientParams = {
	/**
	 * The API key for authenticating requests. This must be provided.
	 */
	apiKey?: string;

	/**
	 * Header for auth requests, if nothing is set default one will be used.
	 */
	header?: string;

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

	/**
	 * Silent mode (supress all warning/error messages). Defaults to false.
	 */
	silent?: boolean;
};
