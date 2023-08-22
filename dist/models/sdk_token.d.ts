import { BaseModel } from "./base_model.js";
import { SdkToken as SdkTokenInterface } from "../interfaces/sdk_token.js";
export declare class SdkToken extends BaseModel implements SdkTokenInterface {
    id: number;
    token: string;
    projectId: number;
    lokaliseId: number;
    createdAt: string;
}
