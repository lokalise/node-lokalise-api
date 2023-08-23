import { OtaCollection } from "./ota_collection.js";
import { OtaToken } from "../models/ota_token.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
export declare class OtaTokens extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaToken;
    list(request_params: OtaTeamProject): Promise<OtaToken[]>;
}
