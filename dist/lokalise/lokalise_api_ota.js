import { BaseClient } from "./base_client.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";
export class LokaliseApiOta extends BaseClient {
    constructor(params) {
        super(params);
        this.clientData.tokenType = params["tokenType"] ?? "Bearer";
        this.clientData.authHeader = "Authorization";
        this.clientData.host =
            this.clientData.host ?? "https://ota.lokalise.com/v3";
    }
    otaBundleManagement() {
        return new OtaBundleManagement(this.clientData);
    }
    otaUsageStatistics() {
        return new OtaUsageStatistics(this.clientData);
    }
    sdkTokens() {
        return new SdkTokens(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api_ota.js.map