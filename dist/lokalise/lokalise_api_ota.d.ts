import { BaseClient, ClientParams } from "./base_client.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";
export declare class LokaliseApiOta extends BaseClient {
    constructor(params: ClientParams);
    otaBundleManagement(): OtaBundleManagement;
    otaUsageStatistics(): OtaUsageStatistics;
    sdkTokens(): SdkTokens;
}
