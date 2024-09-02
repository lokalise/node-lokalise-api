import { OtaBundleArchive } from "../models/ota/ota_bundle_archive.js";
import { OtaCollection } from "./ota_collection.js";
export class OtaBundles extends OtaCollection {
    static rootElementNameSingular = "data";
    static prefixURI = "lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";
    static elementClass = OtaBundleArchive;
    get(bundle_params, request_params) {
        const params = {
            ...request_params,
            ...bundle_params,
        };
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
}
//# sourceMappingURL=ota_bundles.js.map