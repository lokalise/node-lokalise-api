import { OtaApiError as OtaApiErrorInterface } from "../interfaces/ota_api_error.js";
import { BaseModel } from "./base_model.js";
export declare class OtaApiError extends BaseModel implements OtaApiErrorInterface {
    statusCode: string;
    message: string;
    error: string;
}
