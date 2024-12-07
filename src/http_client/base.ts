import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { getVersion } from "../lokalise/pkg.js";
import { ApiError } from "../models/api_error.js";
import type { HttpMethod } from "../types/http_method.js";

export type ApiResponse = {
	json: Keyable;
	headers: Headers;
};

export class ApiRequest {
	public promise: Promise<ApiResponse>;
	public params: WritableKeyable = {};
	protected readonly urlRoot = "https://api.lokalise.com/api2/";

	constructor(
		uri: string,
		method: HttpMethod,
		body: object | object[] | null,
		params: Keyable,
		clientData: ClientData,
	) {
		// Since we modify params, we need to make a copy of it so we don't modify the original
		this.params = { ...params };
		this.promise = this.createPromise(uri, method, body, clientData);
	}

	protected async createPromise(
		uri: string,
		method: HttpMethod,
		body: object | object[] | null,
		clientData: ClientData,
	): Promise<ApiResponse> {
		const url = this.composeURI(`/${clientData.version}/${uri}`);

		const prefixUrl = clientData.host ?? this.urlRoot;

		const headers = await this.buildHeaders(clientData, method, body);

		const options: RequestInit = {
			method: method,
			headers: headers,
			...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
		};

		const target = new URL(url, prefixUrl);
		target.search = new URLSearchParams(this.params).toString();

		return this.fetchAndHandleResponse(
			target,
			options,
			clientData.requestTimeout,
		);
	}

	protected async fetchAndHandleResponse(
		target: URL,
		options: RequestInit,
		requestTimeout: number | undefined,
	): Promise<ApiResponse> {
		const controller = new AbortController();
		let timeoutId: NodeJS.Timeout | null = null;

		if (requestTimeout && requestTimeout > 0) {
			timeoutId = setTimeout(() => controller.abort(), requestTimeout);
		}

		try {
			const response = await fetch(target, {
				...options,
				signal: controller.signal,
			});

			return this.processResponse(response);
		} catch (err) {
			if (err instanceof Error) {
				if (err.name === "AbortError") {
					return Promise.reject(
						new ApiError(err.message, 408, { reason: "timeout" }),
					);
				}
				return Promise.reject(
					new ApiError(err.message, 500, { reason: "network or fetch error" }),
				);
			}
			return Promise.reject(
				new ApiError("An unknown error occurred", 500, {
					reason: String(err),
				}),
			);
		} finally {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		}
	}

	protected async processResponse(response: Response): Promise<ApiResponse> {
		let responseJSON: unknown = null;

		try {
			if (response.status !== 204) {
				responseJSON = await response.json();
			}
		} catch (error) {
			return Promise.reject(
				new ApiError((error as Error).message, response.status, {
					statusText: response.statusText,
					reason: "JSON processing failed",
				}),
			);
		}

		if (response.ok) {
			return {
				json: responseJSON as Keyable,
				headers: response.headers,
			};
		}

		return Promise.reject(this.getErrorFromResp(responseJSON));
	}

	protected getErrorFromResp(respJson: unknown): ApiError {
		if (!respJson || typeof respJson !== "object") {
			// Fallback for unexpected non-object responses
			return new ApiError("An unknown error occurred", 500, {
				reason: "unexpected response format",
			});
		}

		const errorObj = respJson as Record<string, unknown>;

		// Handle top-level "error" as a string (e.g., ENTITY_NOT_FOUND)
		if (
			typeof errorObj.message === "string" &&
			typeof errorObj.statusCode === "number" &&
			typeof errorObj.error === "string"
		) {
			return new ApiError(
				errorObj.message,
				errorObj.statusCode,
				{ reason: errorObj.error }, // Use the string `error` as the reason
			);
		}

		// Nested "error" object
		if (errorObj.error && typeof errorObj.error === "object") {
			const {
				message = "Unknown error",
				code = 500,
				details,
			} = errorObj.error as Record<string, unknown>;
			return new ApiError(
				String(message),
				typeof code === "number" ? code : 500,
				details ?? { reason: "server error without details" },
			);
		}

		// Top-level fields for error
		if (
			typeof errorObj.message === "string" &&
			(typeof errorObj.code === "number" ||
				typeof errorObj.errorCode === "number")
		) {
			return new ApiError(
				errorObj.message,
				(typeof errorObj.code === "number"
					? errorObj.code
					: errorObj.errorCode) as number,
				errorObj.details ?? { reason: "server error without details" },
			);
		}

		return new ApiError("An unknown error occurred", 500, {
			reason: "unhandled error format",
			data: respJson,
		});
	}

	protected async buildHeaders(
		clientData: ClientData,
		method: HttpMethod,
		body: object | object[] | null,
	): Promise<Headers> {
		const headers = new Headers({
			Accept: "application/json",
			"User-Agent": `node-lokalise-api/${await getVersion()}`,
		});

		headers.append(
			clientData.authHeader,
			clientData.tokenType.length > 0
				? `${clientData.tokenType} ${clientData.token}`
				: clientData.token,
		);

		if (clientData.enableCompression) {
			headers.append("Accept-Encoding", "gzip,deflate");
		}

		if (method !== "GET" && body) {
			headers.append("Content-type", "application/json");
		}

		return headers;
	}

	protected composeURI(rawUri: string): string {
		const regexp = /{(!{0,1}):(\w*)}/g;
		const uri = rawUri.replace(regexp, this.mapUriParams());
		return uri.endsWith("/") ? uri.slice(0, -1) : uri;
	}

	protected mapUriParams(): (
		substring: string,
		isMandatory: string,
		paramName: string,
	) => string {
		return (
			_substring: string,
			isMandatory: string,
			paramName: string,
		): string => {
			if (this.params[paramName] != null) {
				const t_param = String(this.params[paramName]);
				// Remove the param so it won't appear as a query parameter
				delete this.params[paramName];
				return t_param;
			}
			if (isMandatory === "!") {
				throw new Error(`Missing required param: ${paramName}`);
			}
			return "";
		};
	}
}
