import { ApiRequest } from "../http_client/base.js";
import type { BulkResult } from "../interfaces/bulk_result.js";
import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable } from "../interfaces/keyable.js";
import type { ApiError } from "../models/api_error.js";
import { CursorPaginatedResult } from "../models/cursor_paginated_result.js";
import { PaginatedResult } from "../models/paginated_result.js";
import type { HttpMethod } from "../types/http_method.js";

type RejectHandler = (data: any) => ApiError;
type ResolveHandler = (json: Keyable, headers: Headers, ...args: any[]) => any;

export abstract class BaseCollection {
	readonly clientData: ClientData;
	protected static rootElementName: string;
	protected static rootElementNameSingular: string | null;
	protected static endpoint: string | null;
	protected static prefixURI: string | null;
	protected static elementClass: any;

	// Secondaries are used when an instance of a different class has to be created
	// For example, uploading a File may return a QueuedProcess
	protected static secondaryElementNameSingular: string | null;
	protected static secondaryElementClass: any;

	constructor(clientData: ClientData) {
		this.clientData = clientData;
	}

	protected doList(req_params: Keyable): Promise<any> {
		const params = {
			...req_params,
		};
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJson,
			this.handleReject,
			null,
		);
	}

	protected doListCursor(req_params: Keyable): Promise<any> {
		const params = {
			...req_params,
		};
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJsonCursor,
			this.handleReject,
			null,
		);
	}

	protected doGet(id: string | number, req_params: Keyable = {}): Promise<any> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(
			"GET",
			params,
			this.populateObjectFromJsonRoot,
			this.handleReject,
			null,
		);
	}

	protected doDelete(
		id: string | number,
		req_params: Keyable = {},
	): Promise<any> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(
			"DELETE",
			params,
			this.returnBareJSON,
			this.handleReject,
			null,
		);
	}

	protected doCreate(
		body: Keyable | null,
		req_params: Keyable = {},
		resolveFn = this.populateObjectFromJson,
	): Promise<any> {
		const params = {
			...req_params,
		};

		return this.createPromise(
			"POST",
			params,
			resolveFn,
			this.handleReject,
			body,
		);
	}

	protected doUpdate(
		id: string | number,
		body: Keyable | null,
		req_params: Keyable,
		resolveFn = this.populateObjectFromJsonRoot,
		method: HttpMethod = "PUT",
	): Promise<any> {
		const params = {
			...req_params,
			id,
		};
		return this.createPromise(
			method,
			params,
			resolveFn,
			this.handleReject,
			body,
		);
	}

	protected populateObjectFromJsonRoot(json: Keyable, headers: Headers): any {
		const childClass = <typeof BaseCollection>this.constructor;
		let jsonData = json;

		if (childClass.rootElementNameSingular) {
			jsonData = Object(jsonData)[childClass.rootElementNameSingular];
		}

		return this.populateObjectFromJson(jsonData, headers);
	}

	protected populateSecondaryObjectFromJsonRoot(
		json: Keyable,
		headers: Headers,
	): any {
		const childClass = <typeof BaseCollection>this.constructor;

		const secondaryJson =
			Object(json)[<string>childClass.secondaryElementNameSingular];

		return this.populateObjectFromJson(secondaryJson, headers, true);
	}

	protected populateObjectFromJson(
		json: Keyable,
		_headers: Headers,
		secondary = false,
	): any {
		const childClass = <typeof BaseCollection>this.constructor;

		return secondary
			? new childClass.secondaryElementClass(json)
			: new childClass.elementClass(json);
	}

	protected populateArrayFromJsonBulk(
		json: Keyable,
		headers: Headers,
	): BulkResult | this[] {
		const childClass = <typeof BaseCollection>this.constructor;
		const arr: this[] = [];
		const jsonArray = json[(<any>childClass).rootElementName];
		for (const obj of jsonArray) {
			arr.push(<this>this.populateObjectFromJson(obj, headers));
		}
		const result: BulkResult = {
			errors: json.errors,
			items: arr,
		};
		return result;
	}

	protected populateArrayFromJson(
		json: Keyable,
		headers: Headers,
	): PaginatedResult | Keyable | this[] {
		const resultArray = this.populateArray(json, headers);

		return this.isPaginated(headers)
			? new PaginatedResult(resultArray, headers)
			: resultArray;
	}

	private populateArray(json: Keyable, headers: Headers): this[] {
		const childClass = <typeof BaseCollection>this.constructor;

		return json[(<any>childClass).rootElementName].map((obj: Keyable) =>
			this.populateObjectFromJson(obj, headers),
		);
	}

	private isPaginated(headers: Headers): boolean {
		return (
			!!headers.get("x-pagination-total-count") &&
			!!headers.get("x-pagination-page")
		);
	}

	protected populateArrayFromJsonCursor(
		json: Keyable,
		headers: Headers,
	): CursorPaginatedResult | Keyable | this[] {
		const childClass = <typeof BaseCollection>this.constructor;
		const arr: this[] = [];
		const jsonArray = json[(<any>childClass).rootElementName];

		for (const obj of jsonArray) {
			arr.push(<this>this.populateObjectFromJson(obj, headers));
		}

		return new CursorPaginatedResult(arr, headers);
	}

	protected populateApiErrorFromJson(json: any): ApiError {
		return <ApiError>json;
	}

	protected returnBareJSON(
		json: Keyable | Array<Keyable>,
	): Keyable | Array<Keyable> {
		return json;
	}

	protected handleReject(data: any): ApiError {
		return this.populateApiErrorFromJson(data);
	}

	protected async createPromise(
		method: HttpMethod,
		params: Keyable,
		resolveFn: ResolveHandler | null,
		rejectFn: RejectHandler,
		body: object | object[] | null,
		uri: string | null = null,
	): Promise<any> {
		const request = this.prepareRequest(method, body, params, uri);

		try {
			const data = await this.sendRequest(request);

			return resolveFn ? resolveFn.call(this, data.json, data.headers) : null;
		} catch (err) {
			return this.handleError(err, rejectFn);
		}
	}

	protected sendRequest(request: ApiRequest): Promise<any> {
		return request.promise;
	}

	protected handleError(err: any, rejectFn: RejectHandler): Promise<never> {
		return Promise.reject(rejectFn.call(this, err));
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

	protected getUri(uri: string | null): string {
		const childClass = <typeof BaseCollection>this.constructor;

		// Use a local variable instead of reassigning the parameter
		const resolvedUri = uri ? uri : childClass.prefixURI;

		return <string>resolvedUri;
	}

	protected objToArray(raw_body: Keyable | Keyable[]): Array<Keyable> {
		if (!Array.isArray(raw_body)) {
			return Array(raw_body);
		}
		return raw_body;
	}
}
