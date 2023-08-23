import { OtaCollection } from "./ota_collection.js";
export class OtaBundlePublishing extends OtaCollection {
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";
    publish(bundleId, request_params) {
        const params = {
            ...request_params,
            ...{ action: "publish" },
        };
        return this.createPromise("POST", params, null, this.handleReject, {
            bundleId,
        });
    }
    stage(bundleId, request_params) {
        const params = {
            ...request_params,
            ...{ action: "stage" },
        };
        return this.createPromise("POST", params, null, this.handleReject, {
            bundleId,
        });
    }
}
//# sourceMappingURL=ota_bundle_publishing.js.map