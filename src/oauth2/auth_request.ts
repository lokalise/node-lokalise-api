import type { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";
import { LokalisePkg } from "../lokalise/pkg.js";
import type { HttpMethod } from "../types/http_method.js";

export class AuthRequest {
	static async createPromise(
		uri: string,
		method: HttpMethod,
		body: object | object[] | null,
		{ host, version }: AuthDataInterface,
	): Promise<any> {
		const fullUri = `/${version}/${uri}`;
		const target = new URL(fullUri, host);

		const options: RequestInit = {
			method: method,
			headers: await AuthRequest.buildHeaders(),
			body: JSON.stringify(body),
		};

		return AuthRequest.fetchAndHandleResponse(target, options);
	}

	private static async fetchAndHandleResponse(
		target: URL,
		options: RequestInit,
	): Promise<any> {
		try {
			const response = await fetch(target, options);
			const responseJSON = await response.json();

			if (response.ok) {
				return Promise.resolve({
					json: responseJSON,
					headers: response.headers,
				});
			}

			return Promise.reject({
				...{ code: response.status },
				...responseJSON,
			});
		} catch (err) {
			return Promise.reject({
				message: (err as Error).message,
			});
		}
	}

	private static async buildHeaders(): Promise<Headers> {
		const headers = new Headers({
			Accept: "application/json",
			"User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
			"Content-type": "application/json",
		});

		return headers;
	}
}
