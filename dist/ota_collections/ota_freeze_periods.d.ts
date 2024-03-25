import { OtaCollection } from "./ota_collection.js";
import { OtaFreezePeriod } from "../models/ota/ota_freeze_period.js";
import type { OtaTeamProject, OtaTeamProjectFramework, OtaResourceDeleted, OtaFreezePeriodParams } from "../types/ota.js";
export declare class OtaFreezePeriods extends OtaCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof OtaFreezePeriod;
    list(requestParams: OtaTeamProjectFramework): Promise<OtaFreezePeriod[]>;
    create(freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    update(freezeId: string | number, freezeParams: OtaFreezePeriodParams, requestParams: OtaTeamProject): Promise<OtaFreezePeriod>;
    delete(freezeId: string | number, requestParams: OtaTeamProject): Promise<OtaResourceDeleted>;
}
