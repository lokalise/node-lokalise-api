import { OtaBundles } from "../ota_collections/ota_bundles.js";
import { BaseClient, ClientParams } from "./base_client.js";
export declare class LokaliseOtaBundles extends BaseClient {
	constructor(params: ClientParams);
	otaBundles(): OtaBundles;
}
