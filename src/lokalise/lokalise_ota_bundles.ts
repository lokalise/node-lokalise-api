import type { ClientParams } from "../interfaces/client_params.js";
import { OtaBundles } from "../ota_collections/ota_bundles.js";
import { BaseClient } from "./base_client.js";

/**
 * A specialized client for interacting with Lokalise OTA (Over-The-Air) bundle resources.
 * Extends the BaseClient to configure authentication and endpoint specifics for OTA bundles.
 */
export class LokaliseOtaBundles extends BaseClient {
	/**
	 * Constructs a new LokaliseOtaBundles client instance.
	 * @param params - Configuration parameters, including the required `apiKey`.
	 *                 Optional parameters include `version`, `host`, etc.
	 *                 Defaults: `host` = "https://ota.lokalise.com", `version` = "v3".
	 * @throws Error If no valid API key is provided.
	 */
	constructor(params: ClientParams) {
		super(params);

		// Use the OTA-specific auth header and default host.
		this.clientData.authHeader = "x-ota-api-token";
		this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";

		// Default OTA API version if not provided.
		this.clientData.version = params.version ?? "v3";
	}

	/**
	 * Provides access to the OtaBundles collection.
	 * @returns An OtaBundles instance.
	 */
	otaBundles(): OtaBundles {
		return new OtaBundles(this.clientData);
	}
}
