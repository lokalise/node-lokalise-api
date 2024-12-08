/**
 * Interface representing the structure of an API error.
 */
export interface ApiError {
	/**
	 * The error message.
	 */
	message: string;

	/**
	 * The error code representing the type of API error.
	 */
	code: number;

	/**
	 * Additional details about the error (optional).
	 */
	details?: any;
}
