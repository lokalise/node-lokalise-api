import { OtaBundle as OtaBundleInterface } from "../interfaces/ota_bundle.js";
import { BaseModel } from "./base_model.js";
export declare class OtaBundle extends BaseModel implements OtaBundleInterface {
    url: string;
    version: number;
}
