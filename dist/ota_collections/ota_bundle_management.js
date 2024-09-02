import { OtaBundle } from "../models/ota/ota_bundle.js";
import { OtaCollection } from "./ota_collection.js";
export class OtaBundleManagement extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";
    static elementClass = OtaBundle;
    list(request_params) {
        return this.doList(request_params);
    }
    get(bundleId, requestParams) {
        return this.doGet(bundleId, requestParams);
    }
    update(bundleId, bundleParams, requestParams) {
        return this.doUpdate(bundleId, bundleParams, requestParams, this.populateObjectFromJsonRoot, "PATCH");
    }
    delete(bundleId, requestParams) {
        return this.doDelete(bundleId, requestParams);
    }
}
//# sourceMappingURL=ota_bundle_management.js.map