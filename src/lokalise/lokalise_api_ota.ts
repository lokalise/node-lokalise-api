import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaBundlePublishing } from "../ota_collections/ota_bundle_publishing.js";
import { OtaFreezePeriods } from "../ota_collections/ota_freeze_periods.js";
import { OtaSdkTokens } from "../ota_collections/ota_sdk_tokens.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";
import { BaseClient, type ClientParams } from "./base_client.js";

export class LokaliseApiOta extends BaseClient {
	constructor(params: ClientParams) {
		super(params);

		this.clientData.tokenType = params["tokenType"] ?? "Bearer";

		this.clientData.authHeader = "Authorization";

		this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";

		this.clientData.version = params.version ?? "v3";
	}

	otaBundleManagement(): OtaBundleManagement {
		return new OtaBundleManagement(this.clientData);
	}

	otaBundlePublishing(): OtaBundlePublishing {
		return new OtaBundlePublishing(this.clientData);
	}

	otaUsageStatistics(): OtaUsageStatistics {
		return new OtaUsageStatistics(this.clientData);
	}

	otaFreezePeriods(): OtaFreezePeriods {
		return new OtaFreezePeriods(this.clientData);
	}

	otaSdkTokens(): OtaSdkTokens {
		return new OtaSdkTokens(this.clientData);
	}
}
