import type {
	ApiErrorVantage as IApiErrorVantage,
	VantageValidationError,
} from "../../interfaces/vantage/api_error.js";

import { isRecord } from "../../utils/type_guards.js";

/**
 * Checks whether a value matches the Vantage API validation error structure.
 *
 * Validation errors are received as untrusted JSON, so their properties
 * must be checked before exposing them as typed objects.
 */
function isValidationError(value: unknown): value is VantageValidationError {
	if (!isRecord(value)) {
		return false;
	}

	return (
		typeof value.keyword === "string" &&
		typeof value.instancePath === "string" &&
		typeof value.schemaPath === "string" &&
		(value.message === undefined || typeof value.message === "string") &&
		isRecord(value.params)
	);
}

/**
 * Represents an error returned by the Lokalise Vantage API.
 *
 * Preserves the original API error details and provides convenient access
 * to individual validation issues when the error code is VALIDATION_ERROR.
 */
export class ApiErrorVantage extends Error implements IApiErrorVantage {
	/** Machine-readable API error code. */
	readonly code: string;

	/** Original error details returned by the API. */
	readonly details?: Record<string, unknown>;

	/**
	 * Individual validation issues returned by the API.
	 *
	 * Populated only for VALIDATION_ERROR responses containing an array
	 * of recognized validation issues in details.error.
	 *
	 * The original validation data remains available in details.
	 */
	readonly validationErrors?: VantageValidationError[];

	constructor(message: string, code: string, details?: Record<string, unknown>) {
		super(message);

		this.name = "ApiErrorVantage";
		this.code = code;

		if (details !== undefined) {
			this.details = details;
		}

		// Extract recognized validation issues without modifying the
		// original details object or assuming that every error has them.
		if (code === "VALIDATION_ERROR" && Array.isArray(details?.error)) {
			this.validationErrors = details.error.filter(isValidationError);
		}
	}

	/**
	 * Returns a readable error description, including the error code
	 * and original details when available.
	 */
	override toString(): string {
		let result = `${this.name}: ${this.message} (Code: ${this.code})`;

		if (this.details) {
			result += ` | Details: ${JSON.stringify(this.details)}`;
		}

		return result;
	}
}
