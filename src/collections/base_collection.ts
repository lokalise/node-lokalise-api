import { ApiRequest } from "../http_client/base.js";
import type { ApiResponse } from "../http_client/base.js";
import type { BulkResult } from "../interfaces/bulk_result.js";
import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable } from "../interfaces/keyable.js";
import { CursorPaginatedResult } from "../models/cursor_paginated_result.js";
import { PaginatedResult } from "../models/paginated_result.js";
import type { HttpMethod } from "../types/http_method.js";

type ResolveHandler<T> = (json: Keyable, headers: Headers) => T;

export abstract class BaseCollection<ElementType, SecondaryType = ElementType> {
	readonly clientData: ClientData;
	protected static endpoint: string | null;
	protected static prefixURI: string | null;

	constructor(clientData: ClientData) {
		this.clientData = clientData;
	}

	// Model to represent the data returned by the API
	protected abstract get elementClass(): new (
		json: Keyable,
	) => ElementType;
	protected get rootElementName(): string {
		throw new Error("Root element name is not defined for this collection");
	}
	protected get rootElementNameSingular(): string | null {
		throw new Error(
			"Root element name singular is not defined for this collection",
		);
	}
	// Secondaries are used when an instance of a different class has to be created
	// For example, uploading a File may return a QueuedProcess
	protected get secondaryElementClass(): new (
		json: Keyable,
	) => SecondaryType {
		throw new Error("Secondary elements are not supported by this collection");
	}

	protected get secondaryElementNameSingular(): string {
		throw new Error(
			"Secondary element name singular is not defined for this collection",
		);
	}

	protected doList(
		req_params: Keyable,
	): Promise<PaginatedResult<ElementType> | ElementType[]> {
		const params = {
			...req_params,
		};
		return this.createPromise("GET", params, this.populateArrayFromJson, null);
	}

	protected doListCursor(
		req_params: Keyable,
	): Promise<CursorPaginatedResult<ElementType>> {
		const params = {
			...req_params,
		};
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJsonCursor,
			null,
		);
	}

	protected doGet(
		id: string | number,
		req_params: Keyable = {},
	): Promise<ElementType> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(
			"GET",
			params,
			this.populateObjectFromJsonRoot,
			null,
		);
	}

	protected doDelete<T = Keyable | Keyable[]>(
		id: string | number,
		req_params: Keyable = {},
	): Promise<T> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(
			"DELETE",
			params,
			this.returnBareJSON,
			null,
		) as Promise<T>;
	}

	protected doCreate(
		body: object | object[] | null,
		req_params: Keyable = {},
		resolveFn = this.populateObjectFromJson,
	): Promise<ElementType | SecondaryType> {
		const params = {
			...req_params,
		};

		return this.createPromise("POST", params, resolveFn, body);
	}

	protected doCreateArray(
		body: object | object[] | null,
		req_params: Keyable,
		resolveFn: ResolveHandler<ElementType[]> = this.populateArray,
	): Promise<ElementType[]> {
		const params = { ...req_params };

		return this.createPromise("POST", params, resolveFn, body);
	}

	protected doUpdate(
		id: string | number,
		body: Keyable | null,
		req_params: Keyable,
		resolveFn = this.populateObjectFromJsonRoot,
		method: HttpMethod = "PUT",
	): Promise<ElementType> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(method, params, resolveFn, body);
	}

	protected populateObjectFromJsonRoot(
		json: Keyable,
		headers: Headers,
	): ElementType {
		let jsonData = json;

		const rootElementName = this.rootElementNameSingular;
		if (this.rootElementNameSingular && rootElementName) {
			const dataRecord = jsonData as Record<string, Keyable>;
			jsonData = dataRecord[rootElementName];
			if (!jsonData) {
				throw new Error(`Missing property '${rootElementName}' in JSON object`);
			}
		}

		return this.populateObjectFromJson(jsonData, headers) as ElementType;
	}

	protected populateSecondaryObjectFromJsonRoot(
		json: Keyable,
		headers: Headers,
	): SecondaryType {
		const secondaryElementName = this.secondaryElementNameSingular;
		const jsonRecord = json as Record<string, unknown>;
		const secondaryJson = jsonRecord[secondaryElementName];

		if (!secondaryJson) {
			throw new Error(
				`Missing property '${secondaryElementName}' in JSON object`,
			);
		}

		return this.populateObjectFromJson(
			secondaryJson,
			headers,
			true,
		) as SecondaryType;
	}

	protected populateArrayFromJsonBulk(
		json: Keyable,
		headers: Headers,
	): BulkResult {
		const rootElementName = this.rootElementName;

		const jsonArray = json[rootElementName];
		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${rootElementName}', but got ${typeof jsonArray}`,
			);
		}

		const items: ElementType[] = jsonArray.map(
			(obj) => this.populateObjectFromJson(obj, headers) as ElementType,
		);

		const result: BulkResult = {
			errors: json.errors,
			items,
		};

		return result;
	}

	protected populateArrayFromJson(
		json: Keyable,
		headers: Headers,
	): PaginatedResult<ElementType> | ElementType[] {
		const resultArray = this.populateArray(json, headers);

		return this.isPaginated(headers)
			? new PaginatedResult<ElementType>(resultArray, headers)
			: resultArray;
	}

	protected populateArray(json: Keyable, headers: Headers): ElementType[] {
		const rootElementName = this.rootElementName;

		const jsonArray = json[rootElementName];
		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${rootElementName}', but got ${typeof jsonArray}`,
			);
		}

		return jsonArray.map(
			(obj: Keyable) =>
				this.populateObjectFromJson(obj, headers) as ElementType,
		);
	}

	protected populateArrayFromJsonCursor(
		json: Keyable,
		headers: Headers,
	): CursorPaginatedResult<ElementType> {
		const rootElementName = this.rootElementName;

		const jsonArray = json[rootElementName];
		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${rootElementName}', but got ${typeof jsonArray}`,
			);
		}

		const items: ElementType[] = jsonArray.map(
			(obj: Keyable) =>
				this.populateObjectFromJson(obj, headers) as ElementType,
		);

		return new CursorPaginatedResult<ElementType>(items, headers);
	}

	protected populateObjectFromJson(
		json: Keyable,
		_headers: Headers,
		secondary = false,
	): ElementType | SecondaryType {
		const cls = secondary ? this.secondaryElementClass : this.elementClass;
		return new cls(json);
	}

	protected returnBareJSON<T>(json: Keyable | Keyable[]): T {
		return json as T;
	}

	protected objToArray(raw_body: Keyable | Keyable[]): Keyable[] {
		return Array.isArray(raw_body) ? raw_body : [raw_body];
	}

	protected async createPromise<T>(
		method: HttpMethod,
		params: Keyable,
		resolveFn: ResolveHandler<T>,
		body: object | object[] | null,
		uri: string | null = null,
	): Promise<T> {
		const request = this.prepareRequest(method, body, params, uri);

		const data = await this.sendRequest(request);

		// return resolveFn ? resolveFn.call(this, data.json, data.headers) : null;
		return resolveFn.call(this, data.json, data.headers);
	}

	protected prepareRequest(
		method: HttpMethod,
		body: object | object[] | null,
		params: Keyable,
		uri: string | null,
	): ApiRequest {
		return new ApiRequest(
			this.getUri(uri),
			method,
			body,
			params,
			this.clientData,
		);
	}

	protected sendRequest(request: ApiRequest): Promise<ApiResponse> {
		return request.promise;
	}

	protected getUri(uri: string | null): string {
		const childClass = this.constructor as typeof BaseCollection;
		const resolvedUri = uri ?? childClass.prefixURI;
		if (!resolvedUri) {
			throw new Error("No URI or prefixURI provided.");
		}
		return resolvedUri;
	}

	private isPaginated(headers: Headers): boolean {
		return (
			!!headers.get("x-pagination-total-count") &&
			!!headers.get("x-pagination-page")
		);
	}
}
