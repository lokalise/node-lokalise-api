import type { ClientData as ClientDataInterface } from "../interfaces/client_data.js";

export type ClientParams = {
	apiKey?: string;
	enableCompression?: boolean;
	tokenType?: string;
	host?: string;
	version?: string;
	requestTimeout?: number;
};

export class BaseClient {
	readonly clientData: ClientDataInterface = {
		token: "",
		tokenType: "",
		authHeader: "x-api-token",
		enableCompression: false,
		requestTimeout: undefined,
	};

	/**
	 * Instantiate BaseClient with API key and optional parameters
	 * @param params ClientParams object
	 */
	constructor(params: ClientParams) {
		const apiKey = params.apiKey;
		if (!apiKey || apiKey.trim().length === 0) {
			throw new Error("Instantiation failed: Please pass an API key");
		}
		this.clientData.token = apiKey;
		this.clientData.enableCompression = params.enableCompression ?? false;
		this.clientData.host = params.host;
		this.clientData.requestTimeout = params.requestTimeout;
	}
}
