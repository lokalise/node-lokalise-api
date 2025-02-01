import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { getVersion } from "../lokalise/pkg.js";
import { ApiError } from "../models/api_error.js";
import type { HttpMethod } from "../types/http_method.js";

export type ApiResponse = {
	json: Keyable;
	headers: Headers;
};

/**
 * Represents a single API request to the Lokalise API.
 * Handles URL construction, request initiation, response processing, and error handling.
 */
export class ApiRequest {
	/**
	 * The resolved response from the API request.
	 */
	public response!: ApiResponse;

	/**
	 * Query and path parameters used to construct the request URL.
	 * This object is modified during URL construction, removing parameters used in path segments.
	 */
	public params: WritableKeyable = {};

	/**
	 * The default base URL for the Lokalise API.
	 */
	protected readonly urlRoot = "https://api.lokalise.com/api2/";

	/**
	 * Constructs a new ApiRequest instance.
	 * This constructor is synchronous; async initialization happens in the static factory method.
	 * @param uri - The endpoint URI (versioned path expected).
	 * @param method - The HTTP method (GET, POST, PUT, DELETE, etc).
	 * @param body - The request payload, if applicable.
	 * @param params - Query and/or path parameters.
	 * @param clientData - Authentication and configuration data for the request.
	 */
	constructor(
		_uri: string,
		_method: HttpMethod,
		_body: object | object[] | null,
		params: Keyable,
		_clientData: ClientData,
	) {
		// Copy params to avoid modifying the original object
		this.params = { ...params };
	}

	/**
	 * Static async factory method to create an ApiRequest instance with a fully resolved response.
	 * @param uri - The endpoint URI (versioned path expected).
	 * @param method - The HTTP method (GET, POST, PUT, DELETE, etc).
	 * @param body - The request payload, if applicable.
	 * @param params - Query and/or path parameters.
	 * @param clientData - Authentication and configuration data for the request.
	 * @returns A promise that resolves to a fully constructed ApiRequest instance with the `response` set.
	 */
	public static async create(
		uri: string,
		method: HttpMethod,
		body: object | object[] | null,
		params: Keyable,
		clientData: ClientData,
	): Promise<ApiRequest> {
		const apiRequest = new ApiRequest(uri, method, body, params, clientData);
		apiRequest.response = await apiRequest.createPromise(
			uri,
			method,
			body,
			clientData,
		);
		return apiRequest;
	}

	/**
	 * Creates the request promise by composing the URL, building headers, and executing the fetch.
	 * @param uri - The endpoint URI.
	 * @param method - The HTTP method.
	 * @param body - The request payload.
	 * @param clientData - Client configuration and auth data.
	 * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
	 */
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

	/**
	 * Executes the fetch request and handles network-level errors.
	 * Applies a request timeout if specified.
	 * @param target - The fully constructed request URL.
	 * @param options - The fetch request options.
	 * @param requestTimeout - Optional timeout in milliseconds.
	 * @returns A promise resolving to an ApiResponse or rejecting with an ApiError.
	 */
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
						new ApiError(`Request timed out after ${requestTimeout}ms`, 408, {
							reason: "timeout",
						}),
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

	/**
	 * Processes the fetch response.
	 * Attempts to parse JSON unless the status is 204 (No Content).
	 * @param response - The raw fetch Response object.
	 * @returns A promise resolving to an ApiResponse if successful, or rejecting with ApiError otherwise.
	 */
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
					reason: "JSON parsing error",
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

	/**
	 * Derives an ApiError instance from the response JSON, which may follow various patterns.
	 * @param respJson - The parsed JSON response from the server.
	 * @returns An ApiError representing the server error.
	 */
	protected getErrorFromResp(respJson: unknown): ApiError {
		if (!respJson || typeof respJson !== "object") {
			return new ApiError("An unknown error occurred", 500, {
				reason: "unexpected response format",
			});
		}

		const errorObj = respJson as Record<string, unknown>;

		// Top-level error format: { message: string, statusCode: number, error: string }
		if (
			typeof errorObj.message === "string" &&
			typeof errorObj.statusCode === "number" &&
			typeof errorObj.error === "string"
		) {
			return new ApiError(errorObj.message, errorObj.statusCode, {
				reason: errorObj.error,
			});
		}

		// Nested error object: { error: { message, code, details } }
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

		// Alternative top-level fields: { message: string, code?: number, errorCode?: number, details?: any }
		if (
			typeof errorObj.message === "string" &&
			(typeof errorObj.code === "number" ||
				typeof errorObj.errorCode === "number")
		) {
			const statusCode =
				typeof errorObj.code === "number" ? errorObj.code : errorObj.errorCode;
			return new ApiError(
				errorObj.message,
				statusCode as number,
				errorObj.details ?? { reason: "server error without details" },
			);
		}

		// Fallback if no known error format matches
		return new ApiError("An unknown error occurred", 500, {
			reason: "unhandled error format",
			data: respJson,
		});
	}

	/**
	 * Builds the request headers, including authentication, compression, and JSON headers as needed.
	 * @param clientData - Client configuration and auth data.
	 * @param method - The HTTP method.
	 * @param body - The request payload.
	 * @returns A promise resolving to the constructed Headers.
	 */
	protected async buildHeaders(
		clientData: ClientData,
		method: HttpMethod,
		body: object | object[] | null,
	): Promise<Headers> {
		const headers = new Headers({
			Accept: "application/json",
			"User-Agent": `node-lokalise-api/${await getVersion()}`,
		});

		// Auth header can be either just the token or "<tokenType> <token>"
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
			headers.append("Content-Type", "application/json");
		}

		return headers;
	}

	/**
	 * Composes the final URI by replacing placeholders of the form `/{!:{paramName}}`
	 * with the corresponding parameter values.
	 * @param rawUri - The raw URI template.
	 * @returns The final composed URI string.
	 * @throws Error if a required parameter is missing.
	 */
	protected composeURI(rawUri: string): string {
		const regexp = /\{(!?):(\w+)\}/g;
		const uri = rawUri.replace(regexp, this.mapUriParams());
		return uri.endsWith("/") ? uri.slice(0, -1) : uri;
	}

	/**
	 * Returns a function that maps URI parameters from placeholders.
	 * @returns A function used as a replacement callback in `composeURI`.
	 * @throws Error if a required parameter is missing.
	 */
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
				const paramValue = String(this.params[paramName]);
				// Remove the parameter so it doesn't appear as a query parameter
				delete this.params[paramName];
				return paramValue;
			}
			if (isMandatory === "!") {
				throw new Error(`Missing required parameter: ${paramName}`);
			}
			return "";
		};
	}
}
