import { OtaStatistics } from "../models/ota/ota_statistics.js";
import { OtaCollection } from "./ota_collection.js";
export class OtaUsageStatistics extends OtaCollection {
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";
    static elementClass = OtaStatistics;
    get(bundle_params, request_params) {
        const params = {
            ...request_params,
            ...bundle_params,
        };
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
}
//# sourceMappingURL=ota_usage_statistics.js.map