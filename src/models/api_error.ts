import { ApiError as ErrorInterface } from "../interfaces/api_error";
import { BaseModel } from "./base_model";

export class ApiError extends BaseModel implements ErrorInterface {
  code: number;
  message: string;
}
