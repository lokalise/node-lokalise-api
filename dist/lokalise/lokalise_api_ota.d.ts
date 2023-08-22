import { ClientParams } from "./lokalise_api.js";
import { LokaliseApiOAuth } from "./lokalise_api_oauth.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
export declare class LokaliseApiOta extends LokaliseApiOAuth {
    constructor(params: ClientParams);
    sdkTokens(): SdkTokens;
}
