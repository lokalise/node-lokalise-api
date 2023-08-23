import { OtaBundle as OtaBundleInterface } from "../interfaces/ota_bundle.js";
import { BaseModel } from "./base_model.js";
export declare class OtaBundle extends BaseModel implements OtaBundleInterface {
    id: number;
    projectId: string;
    isPrerelease: boolean;
    isProduction: boolean;
    createdAt: string;
    createdBy: string;
    framework: string;
    description: string;
    isFrozen: boolean;
    lokaliseId: number;
    fileId: string;
    fileUrl: string;
    modifiedAt: string;
}
