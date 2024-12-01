import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { LokalisePkg } from "../lokalise/pkg.js";
import type { HttpMethod } from "../types/http_method.js";

export class ApiRequest {
	public promise: Promise<any>;
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
	): Promise<any> {
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

		return this.fetchAndHandleResponse(target, options);
	}

	protected async fetchAndHandleResponse(
		target: URL,
		options: RequestInit,
	): Promise<any> {
		try {
			const response = await fetch(target, options);

			return this.processResponse(response);
		} catch (err) {
			return Promise.reject({ message: (err as Error).message });
		}
	}

	protected async processResponse(response: Response): Promise<any> {
		let responseJSON: any = null;

		try {
			if (response.status === 204) {
				responseJSON = null;
			} else {
				responseJSON = await response.json();
			}
		} catch (_error) {
			return Promise.reject({
				message: response.statusText,
				code: response.status,
			});
		}

		if (response.ok) {
			return {
				json: responseJSON,
				headers: response.headers,
			};
		}

		return Promise.reject(this.getErrorFromResp(responseJSON));
	}

	protected async buildHeaders(
		clientData: ClientData,
		method: HttpMethod,
		body: object | object[] | null,
	): Promise<Headers> {
		const headers = new Headers({
			Accept: "application/json",
			"User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
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

	protected getErrorFromResp(respJson: any): any {
		if (typeof respJson.error === "object") {
			return respJson.error;
		}
		return respJson;
	}

	protected composeURI(rawUri: string): string {
		const regexp = /{(!{0,1}):(\w*)}/g;
		const uri = rawUri.replace(regexp, this.mapUriParams());
		return uri.endsWith("/") ? uri.slice(0, -1) : uri;
	}

	protected mapUriParams() {
		return (_entity: any, isMandaratory: string, paramName: string): string => {
			if (this.params[paramName] != null) {
				const t_param = this.params[paramName];

				// We delete the param so we don't send it as a query param as well.
				delete this.params[paramName];

				return t_param;
			}
			if (isMandaratory === "!") {
				throw new Error(`Missing required param: ${paramName}`);
			}
			return "";
		};
	}
}
