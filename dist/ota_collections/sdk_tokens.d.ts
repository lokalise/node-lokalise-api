import { OtaCollection } from "./ota_collection.js";
import { SdkToken } from "../models/sdk_token.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";
export declare class SdkTokens extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof SdkToken;
    list(request_params: OtaTeamProject): Promise<SdkToken[]>;
    create(request_params: OtaTeamProject): Promise<SdkToken>;
    delete(tokenId: string | number, request_params: OtaTeamProject): Promise<OtaResourceDeleted>;
}
