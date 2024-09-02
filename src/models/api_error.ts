import type { ApiError as ErrorInterface } from "../interfaces/api_error.js";
import { BaseModel } from "./base_model.js";

export class ApiError extends BaseModel implements ErrorInterface {
	declare code: number;
	declare message: string;
}
