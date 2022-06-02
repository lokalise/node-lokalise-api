import { AuthError as ErrorInterface } from "../interfaces/auth_error";
import { BaseModel } from "./base_model";

export class AuthError extends BaseModel implements ErrorInterface {
  declare code: number;
  declare error: string;
  declare error_description: string;
  declare error_uri?: string;
}
