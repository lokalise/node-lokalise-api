import type { ClientData as ClientDataInterface } from "../interfaces/client_data.js";

export type ClientParams = {
	apiKey?: string;
	enableCompression?: boolean;
	tokenType?: string;
	host?: string;
	version?: string;
};

export class BaseClient {
	readonly clientData: ClientDataInterface = {
		token: "",
		tokenType: "",
		authHeader: "x-api-token",
		enableCompression: false,
	};

	/*
	 * Instantiate LokaliseApi to call API methods
	 * @param params  object, mandatory
	 * @returns       LokaliseApi object to work with.
	 */
	constructor(params: ClientParams) {
		const apiKey = params.apiKey;
		if (apiKey === null || apiKey === undefined || apiKey.length === 0) {
			throw new Error("Error: Instantiation failed: Please pass an API key");
		}
		this.clientData.token = apiKey;
		const compression = params.enableCompression;
		if (compression !== null && compression !== undefined) {
			this.clientData.enableCompression = compression;
		}
		this.clientData.host = params.host;
	}
}
