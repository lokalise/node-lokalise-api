import { OtaSdkToken } from "../models/ota/ota_sdk_token.js";
import { OtaCollection } from "./ota_collection.js";
export class OtaSdkTokens extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
    static elementClass = OtaSdkToken;
    list(request_params) {
        return this.doList(request_params);
    }
    create(request_params) {
        return this.doCreate(null, request_params, this.populateObjectFromJsonRoot);
    }
    delete(tokenId, request_params) {
        return this.doDelete(tokenId, request_params);
    }
}
//# sourceMappingURL=ota_sdk_tokens.js.map