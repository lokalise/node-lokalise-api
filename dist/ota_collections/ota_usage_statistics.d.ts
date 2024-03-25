import { OtaCollection } from "./ota_collection.js";
import { OtaStatistics } from "../models/ota/ota_statistics.js";
import type { OtaTeamProject, OtaUsageParams } from "../types/ota.js";
export declare class OtaUsageStatistics extends OtaCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof OtaStatistics;
    get(bundle_params: OtaUsageParams, request_params: OtaTeamProject): Promise<OtaStatistics>;
}
