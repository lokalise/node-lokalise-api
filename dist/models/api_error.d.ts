import { ApiError as ErrorInterface } from "../interfaces/api_error.js";
import { BaseModel } from "./base_model.js";
export declare class ApiError extends BaseModel implements ErrorInterface {
    code: number;
    message: string;
}
