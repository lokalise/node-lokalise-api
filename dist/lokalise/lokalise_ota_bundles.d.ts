import { BaseClient, ClientParams } from "./base_client.js";
import { OtaBundles } from "../ota_collections/ota_bundles.js";
export declare class LokaliseOtaBundles extends BaseClient {
    constructor(params: ClientParams);
    otaBundles(): OtaBundles;
}
