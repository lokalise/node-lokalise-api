import { BaseClient, ClientParams } from "./base_client.js";
import { SdkTokens } from "../ota_collections/sdk_tokens.js";
export declare class LokaliseApiOta extends BaseClient {
    constructor(params: ClientParams);
    sdkTokens(): SdkTokens;
}
