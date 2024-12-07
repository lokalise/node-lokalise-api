// import type { ApiError as ErrorInterface } from "../interfaces/api_error.js";
// import { BaseModel } from "./base_model.js";

// export class ApiError extends BaseModel implements ErrorInterface {
// 	declare code: number;
// 	declare message: string;
// }

export class ApiError extends Error {
	code: number;
	details?: any;

	constructor(message: string, code: number, details: any) {
		super(message);
		this.code = code;
		this.details = details;
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}
