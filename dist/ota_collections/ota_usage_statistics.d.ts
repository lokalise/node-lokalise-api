import { OtaCollection } from "./ota_collection.js";
import { OtaStatistics } from "../models/ota_statistics.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
type OtaUsageParams = {
    dateFrom: string;
    dateTo: string;
    framework?: string;
};
export declare class OtaUsageStatistics extends OtaCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof OtaStatistics;
    get(bundle_params: OtaUsageParams, request_params: OtaTeamProject): Promise<OtaStatistics>;
}
export {};
