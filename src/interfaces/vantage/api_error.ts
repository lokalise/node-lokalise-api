/**
 * Describes a single Vantage API request validation issue.
 *
 * The structure corresponds to the validation errors returned by the API.
 */
export interface VantageValidationError {
	/** Validation rule that failed, for example "invalid_format". */
	keyword: string;

	/** JSON pointer to the invalid field, for example "/importId". */
	instancePath: string;

	/** Path to the validation rule in the schema. */
	schemaPath: string;

	/** Human-readable description, for example "Invalid GUID". */
	message?: string;

	/** Additional information about the failed validation rule. */
	params: Record<string, unknown>;
}

/**
 * Represents an error returned by the Vantage API.
 */
export interface ApiErrorVantage {
	/** Machine-readable API error code, for example "VALIDATION_ERROR". */
	readonly code: string;

	/** Original error details returned by the API. */
	readonly details?: Record<string, unknown>;

	/**
	 * Individual request validation issues.
	 *
	 * Available when the API returns a VALIDATION_ERROR containing
	 * a recognized validation error structure.
	 */
	readonly validationErrors?: VantageValidationError[];
}
