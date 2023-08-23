import { OtaCollection } from "./ota_collection.js";
import { OtaFreezePeriod } from "../models/ota_freeze_period.js";
import { OtaTeamProject } from "../interfaces/ota_team_project.js";
import { OtaTeamProjectFramework } from "../interfaces/ota_team_project_framework.js";
import { OtaResourceDeleted } from "../types/ota_resource_deleted.js";
type FreezePeriodParams = {
    from: string;
    to: string;
    bundleId: number | string;
};
export declare class OtaFreezePeriods extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaFreezePeriod;
    list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod[]>;
    create(freezeParams: FreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    update(freezeId: string | number, freezeParams: FreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    delete(freezeId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
export {};
