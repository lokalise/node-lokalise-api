import { OtaFreezePeriod as OtaFreezePeriodInterface } from "../interfaces/ota_freeze_period.js";
import { BaseModel } from "./base_model.js";

export class OtaFreezePeriod
  extends BaseModel
  implements OtaFreezePeriodInterface
{
  declare id: number;
  declare projectId: number;
  declare bundleId: number;
  declare framework: string;
  declare from: string;
  declare to: string;
}
