import { LokaliseApiOAuth } from "./lokalise_api_oauth.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
export class LokaliseApiOta extends LokaliseApiOAuth {
    constructor(params) {
        super(params);
        this.clientData.host =
            this.clientData.host ?? "https://ota.lokalise.com/v3";
    }
    sdkTokens() {
        return new SdkTokens(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api_ota.js.map