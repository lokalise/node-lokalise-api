import { OtaFreezePeriod } from "../models/ota/ota_freeze_period.js";
import { OtaCollection } from "./ota_collection.js";
export class OtaFreezePeriods extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";
    static elementClass = OtaFreezePeriod;
    list(requestParams) {
        return this.doList(requestParams);
    }
    create(freezeParams, requestParams) {
        return this.doCreate(freezeParams, requestParams, this.populateObjectFromJsonRoot);
    }
    update(freezeId, freezeParams, requestParams) {
        return this.doUpdate(freezeId, freezeParams, requestParams);
    }
    delete(freezeId, requestParams) {
        return this.doDelete(freezeId, requestParams);
    }
}
//# sourceMappingURL=ota_freeze_periods.js.map