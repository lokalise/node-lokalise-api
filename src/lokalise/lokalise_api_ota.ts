import { ClientParams } from "./lokalise_api.js";
import { LokaliseApiOAuth } from "./lokalise_api_oauth.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";

export class LokaliseApiOta extends LokaliseApiOAuth {
  constructor(params: ClientParams) {
    super(params);
    this.clientData.host =
      this.clientData.host ?? "https://ota.lokalise.com/v3";
  }

  sdkTokens(): SdkTokens {
    return new SdkTokens(this.clientData);
  }
}
