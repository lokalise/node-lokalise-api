import type { OtaFreezePeriod as OtaFreezePeriodInterface } from "../../interfaces/ota/ota_freeze_period.js";
import { BaseModel } from "./../base_model.js";
export declare class OtaFreezePeriod extends BaseModel implements OtaFreezePeriodInterface {
    id: number;
    projectId: number;
    bundleId: number;
    framework: string;
    from: string;
    to: string;
}
