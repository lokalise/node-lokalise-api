import type { ApiErrorVantage as IApiErrorVantage } from "../../interfaces/vantage/api_error.js";

export class ApiErrorVantage extends Error implements IApiErrorVantage {
	readonly code: string;
	readonly details?: Record<string, unknown>;

	constructor(message: string, code: string, details?: Record<string, unknown>) {
		super(message);
		this.name = "ApiErrorVantage";
		this.code = code;

		if (details !== undefined) {
			this.details = details;
		}
	}

	override toString(): string {
		let result = `${this.name}: ${this.message} (Code: ${this.code})`;

		if (this.details) {
			result += ` | Details: ${JSON.stringify(this.details)}`;
		}

		return result;
	}
}
