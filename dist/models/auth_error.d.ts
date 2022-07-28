import { AuthError as ErrorInterface } from "../interfaces/auth_error";
import { BaseModel } from "./base_model";
export declare class AuthError extends BaseModel implements ErrorInterface {
    code: number;
    error: string;
    error_description: string;
    error_uri?: string;
}
