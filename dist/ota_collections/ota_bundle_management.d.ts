import { OtaCollection } from "./ota_collection.js";
import { OtaBundle } from "../models/ota/ota_bundle.js";
import type { OtaResourceDeleted, OtaTeamProject, OtaBundleUpdateData } from "../types/ota.js";
export declare class OtaBundleManagement extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundle;
    list(request_params: OtaTeamProject): Promise<OtaBundle[]>;
    get(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaBundle>;
    update(bundleId: string | number, bundleParams: OtaBundleUpdateData, requestParams: OtaTeamProject): Promise<OtaBundle>;
    delete(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
