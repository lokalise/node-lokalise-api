import { BaseCollection } from "../collections/base_collection.js";
export class OtaCollection extends BaseCollection {
    populateApiErrorFromJson(json) {
        return json;
    }
    doDelete(id, req_params) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("DELETE", params, this.returnJSONFromData, this.handleReject, null);
    }
    returnJSONFromData(json) {
        return json["data"];
    }
}
//# sourceMappingURL=ota_collection.js.map