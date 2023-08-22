import { OtaCollection } from "./ota_collection.js";
import { SdkToken } from "../models/sdk_token.js";
export class SdkTokens extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
    static elementClass = SdkToken;
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
//# sourceMappingURL=sdk_tokens.js.map