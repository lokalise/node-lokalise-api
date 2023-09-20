import { BaseClient } from "./base_client.js";
import { OtaSdkTokens } from "../ota_collections/ota_sdk_tokens.js";
import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaBundlePublishing } from "../ota_collections/ota_bundle_publishing.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";
import { OtaFreezePeriods } from "../ota_collections/ota_freeze_periods.js";
export class LokaliseApiOta extends BaseClient {
    constructor(params) {
        super(params);
        this.clientData.tokenType = params["tokenType"] ?? "Bearer";
        this.clientData.authHeader = "Authorization";
        this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
        this.clientData.version = params.version ?? "v3";
    }
    otaBundleManagement() {
        return new OtaBundleManagement(this.clientData);
    }
    otaBundlePublishing() {
        return new OtaBundlePublishing(this.clientData);
    }
    otaUsageStatistics() {
        return new OtaUsageStatistics(this.clientData);
    }
    otaFreezePeriods() {
        return new OtaFreezePeriods(this.clientData);
    }
    otaSdkTokens() {
        return new OtaSdkTokens(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api_ota.js.map