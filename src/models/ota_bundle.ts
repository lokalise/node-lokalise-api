import { OtaBundle as OtaBundleInterface } from "../interfaces/ota_bundle.js";
import { BaseModel } from "./base_model.js";

export class OtaBundle extends BaseModel implements OtaBundleInterface {
  declare url: string;
  declare version: number;
}
