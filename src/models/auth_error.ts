import type { IAuthError } from "../interfaces/auth_error.js";
import { BaseModel } from "./base_model.js";

export class AuthError extends BaseModel implements IAuthError {
	declare code: number;
	declare error: string;
	declare error_description: string;
	declare error_uri?: string;
}
