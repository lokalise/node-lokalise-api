import { OtaSdkToken } from "../models/ota/ota_sdk_token.js";
import type { OtaResourceDeleted, OtaTeamProject } from "../types/ota.js";
import { OtaCollection } from "./ota_collection.js";
export declare class OtaSdkTokens extends OtaCollection {
	protected static rootElementName: string;
	protected static rootElementNameSingular: string;
	protected static prefixURI: string;
	protected static elementClass: typeof OtaSdkToken;
	list(request_params: OtaTeamProject): Promise<OtaSdkToken[]>;
	create(request_params: OtaTeamProject): Promise<OtaSdkToken>;
	delete(
		tokenId: string | number,
		request_params: OtaTeamProject,
	): Promise<OtaResourceDeleted>;
}
