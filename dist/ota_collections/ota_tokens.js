import { OtaCollection } from "./ota_collection.js";
import { OtaToken } from "../models/ota_token.js";
export class OtaTokens extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens";
    static elementClass = OtaToken;
    list(request_params) {
        return this.doList(request_params);
    }
}
//# sourceMappingURL=ota_tokens.js.map