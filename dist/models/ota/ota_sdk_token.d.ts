import { BaseModel } from "./../base_model.js";
import { OtaSdkToken as OtaSdkTokenInterface } from "../../interfaces/ota/ota_sdk_token.js";
export declare class OtaSdkToken extends BaseModel implements OtaSdkTokenInterface {
    id: number;
    token: string;
    projectId: number;
    lokaliseId: number;
    createdAt: string;
}
