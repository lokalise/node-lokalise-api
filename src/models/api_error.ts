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
	details?: Record<string, any>;

	/**
	 * Creates an instance of ApiError.
	 *
	 * @param {string} message - The error message.
	 * @param {number} code - The error code.
	 * @param {Record<string, any>} [details] - Additional details about the error.
	 */
	constructor(message: string, code: number, details?: Record<string, any>) {
		super(message);
		this.code = code;
		this.details = details;
	}

	/**
	 * Returns a string representation of the error, including code and details.
	 *
	 * @returns The formatted error message.
	 */
	override toString(): string {
		let baseMessage = `LokaliseError: ${this.message}`;
		baseMessage += ` (Code: ${this.code})`;

		if (this.details) {
			const formattedDetails = Object.entries(this.details)
				.map(([key, value]) => `${key}: ${value}`)
				.join(", ");

			baseMessage += ` | Details: ${formattedDetails}`;
		}
		return baseMessage;
	}
}
