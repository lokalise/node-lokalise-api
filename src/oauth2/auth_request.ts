import type { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";
import { getVersion } from "../lokalise/pkg.js";
import type { AuthError } from "../models/auth_error.js";
import type { HttpMethod } from "../types/http_method.js";

interface ResolvedResponse<T = unknown> {
	json: T;
	headers: Headers;
}

/**
 * Builds and returns headers for the request.
 */
async function buildHeaders(): Promise<Headers> {
	const headers = new Headers({
		Accept: "application/json",
		"User-Agent": `node-lokalise-api/${await getVersion()}`,
		"Content-type": "application/json",
	});

	return headers;
}

/**
 * Fetches the response from the API and handles response validation.
 */
async function fetchAndHandleResponse<T = unknown>(
	target: URL,
	options: RequestInit,
): Promise<ResolvedResponse<T>> {
	try {
		const response = await fetch(target, options);
		const responseJSON = await response.json();

		if (response.ok) {
			return {
				json: responseJSON,
				headers: response.headers,
			};
		}

		const error: AuthError = {
			code: response.status,
			...responseJSON,
		};
		return Promise.reject(error);
	} catch (err) {
		const error: AuthError = {
			error: (err as Error).message,
			code: 500,
			error_description: "",
		};
		return Promise.reject(error);
	}
}

/**
 * Creates and sends an HTTP request, returning the parsed response.
 */
export async function createPromise<T = unknown>(
	uri: string,
	method: HttpMethod,
	body: object | object[],
	{ host, version }: AuthDataInterface,
): Promise<ResolvedResponse<T>> {
	const fullUri = `/${version}/${uri}`;
	const target = new URL(fullUri, host);

	const options: RequestInit = {
		method,
		headers: await buildHeaders(),
		body: JSON.stringify(body),
	};

	return fetchAndHandleResponse<T>(target, options);
}
