import type { ClientParams } from "../interfaces/client_params.js";
import {
	OtaBundleManagement,
	OtaBundlePublishing,
	OtaFreezePeriods,
	OtaSdkTokens,
	OtaUsageStatistics,
} from "../ota_collections/index.js";
import { BaseClient } from "./base_client.js";

/**
 * A specialized client configured for interacting with Lokalise OTA endpoints.
 * Extends `BaseClient` and sets defaults suitable for OTA requests:
 * - `tokenType` defaults to "Bearer"
 * - `authHeader` set to "Authorization"
 * - `host` defaults to "https://ota.lokalise.com"
 * - `version` defaults to "v3"
 */
export class LokaliseApiOta extends BaseClient {
	/**
	 * Creates a new LokaliseApiOta client instance.
	 * @param params - Configuration parameters including `apiKey` and optional overrides for tokenType, host, version, etc.
	 * @throws Error If `apiKey` is missing or empty.
	 */
	constructor(params: ClientParams) {
		super(params);

		this.clientData.tokenType = params.tokenType ?? "Bearer";
		this.clientData.authHeader = "Authorization";
		this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
		this.clientData.version = params.version ?? "v3";
	}

	/**
	 * Provides access to the OtaBundleManagement collection.
	 */
	otaBundleManagement(): OtaBundleManagement {
		return new OtaBundleManagement(this.clientData);
	}

	/**
	 * Provides access to the OtaBundlePublishing collection.
	 */
	otaBundlePublishing(): OtaBundlePublishing {
		return new OtaBundlePublishing(this.clientData);
	}

	/**
	 * Provides access to the OtaUsageStatistics collection.
	 */
	otaUsageStatistics(): OtaUsageStatistics {
		return new OtaUsageStatistics(this.clientData);
	}

	/**
	 * Provides access to the OtaFreezePeriods collection.
	 */
	otaFreezePeriods(): OtaFreezePeriods {
		return new OtaFreezePeriods(this.clientData);
	}

	/**
	 * Provides access to the OtaSdkTokens collection.
	 */
	otaSdkTokens(): OtaSdkTokens {
		return new OtaSdkTokens(this.clientData);
	}
}
