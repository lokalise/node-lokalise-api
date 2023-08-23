import { OtaCollection } from "./ota_collection.js";
import { OtaBundle } from "../models/ota_bundle.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";
type BundleUpdateData = {
    description: string;
};
export declare class OtaBundleManagement extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaBundle;
    list(request_params: OtaTeamProject): Promise<OtaBundle[]>;
    get(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaBundle>;
    update(bundleId: string | number, bundleParams: BundleUpdateData, requestParams: OtaTeamProject): Promise<OtaBundle>;
    delete(bundleId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
export {};
