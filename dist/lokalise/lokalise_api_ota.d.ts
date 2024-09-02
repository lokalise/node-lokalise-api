import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaBundlePublishing } from "../ota_collections/ota_bundle_publishing.js";
import { OtaFreezePeriods } from "../ota_collections/ota_freeze_periods.js";
import { OtaSdkTokens } from "../ota_collections/ota_sdk_tokens.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";
import { BaseClient, type ClientParams } from "./base_client.js";
export declare class LokaliseApiOta extends BaseClient {
    constructor(params: ClientParams);
    otaBundleManagement(): OtaBundleManagement;
    otaBundlePublishing(): OtaBundlePublishing;
    otaUsageStatistics(): OtaUsageStatistics;
    otaFreezePeriods(): OtaFreezePeriods;
    otaSdkTokens(): OtaSdkTokens;
}
