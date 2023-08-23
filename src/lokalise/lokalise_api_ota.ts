import { BaseClient, ClientParams } from "./base_client.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
import { OtaBundleManagement } from "../ota_collections/ota_bundle_management.js";
import { OtaUsageStatistics } from "../ota_collections/ota_usage_statistics.js";

export class LokaliseApiOta extends BaseClient {
  constructor(params: ClientParams) {
    super(params);

    this.clientData.tokenType = params["tokenType"] ?? "Bearer";

    this.clientData.authHeader = "Authorization";

    this.clientData.host =
      this.clientData.host ?? "https://ota.lokalise.com/v3";
  }

  otaBundleManagement(): OtaBundleManagement {
    return new OtaBundleManagement(this.clientData);
  }

  otaUsageStatistics(): OtaUsageStatistics {
    return new OtaUsageStatistics(this.clientData);
  }

  sdkTokens(): SdkTokens {
    return new SdkTokens(this.clientData);
  }
}
