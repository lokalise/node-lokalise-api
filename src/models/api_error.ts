import type { IApiError } from "../interfaces/api_error.js";

/**
 * Represents an API error with a specific code and optional details.
 */
export class ApiError extends Error implements IApiError {
	/**
	 * The error code representing the type of API error.
	 */
	code: number;

	/**
	 * Additional details about the error (optional).
	 */
	details?: any;

	/**
	 * Creates an instance of ApiError.
	 *
	 * @param {string} message - The error message.
	 * @param {number} code - The error code.
	 * @param {any} [details] - Additional details about the error.
	 */
	constructor(message: string, code: number, details?: any) {
		super(message);
		this.code = code;
		this.details = details;
	}
}
