import type { AuthError as ErrorInterface } from "../interfaces/auth_error.js";
import { BaseModel } from "./base_model.js";

export class AuthError extends BaseModel implements ErrorInterface {
	declare code: number;
	declare error: string;
	declare error_description: string;
	declare error_uri?: string;
}
