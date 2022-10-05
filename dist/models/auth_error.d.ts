import { AuthError as ErrorInterface } from "../interfaces/auth_error.js";
import { BaseModel } from "./base_model.js";
export declare class AuthError extends BaseModel implements ErrorInterface {
    code: number;
    error: string;
    error_description: string;
    error_uri?: string;
}
