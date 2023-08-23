import { BaseModel } from "./base_model.js";
import { OtaToken as OtaTokenInterface } from "../interfaces/ota_token.js";
export declare class OtaToken extends BaseModel implements OtaTokenInterface {
    id: number;
    token: string;
    projectId: string;
    lokaliseId: number;
    createdAt: string;
}
