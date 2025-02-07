import { ApiRequest } from "../http_client/base.js";
import type { BulkResult } from "../interfaces/bulk_result.js";
import type { ClientData } from "../interfaces/client_data.js";
import type { Keyable } from "../interfaces/keyable.js";
import { CursorPaginatedResult } from "../models/cursor_paginated_result.js";
import { PaginatedResult } from "../models/paginated_result.js";
import type { HttpMethod } from "../types/http_method.js";

type ResolveHandler<T> = (json: Keyable, headers: Headers) => T;

/**
 * An abstract base class that provides generic CRUD (Create, Read, Update, Delete) operations
 * and handling for pagination, cursor pagination, and bulk operations. Other "collection" classes
 * should extend this class and provide specific implementations for resource endpoints.
 *
 * Expected usage:
 * - Subclasses define `rootElementName` and/or `rootElementNameSingular` to indicate the JSON fields
 *   that contain the desired data.
 * - `elementClass` and optionally `secondaryElementClass` should be overridden to map raw JSON
 *   objects to strongly typed model instances.
 * - `endpoint` and `prefixURI` should be set as static properties in subclasses to specify resource paths.
 */
export abstract class BaseCollection<ElementType, SecondaryType = ElementType> {
	/**
	 * Client data containing authentication and configuration details.
	 * Provided by a `BaseClient` or similar client instance.
	 */
	readonly clientData: ClientData;

	/**
	 * Static endpoint property that subclasses can define to indicate the API endpoint
	 * for this collection. If not set, ensure `prefixURI` or `uri` parameters are passed.
	 */
	protected static endpoint: string | null;

	/**
	 * Static prefixURI property that subclasses can define to indicate a base path.
	 * If `uri` is not passed explicitly, this prefix is used to construct the request URL.
	 */
	protected static prefixURI: string | null;

	/**
	 * Constructs a new BaseCollection instance.
	 * @param clientData - Client data for making authenticated requests.
	 */
	constructor(clientData: ClientData) {
		this.clientData = clientData;
	}

	/**
	 * Abstract getter that must be implemented by subclasses.
	 * Should return a class constructor that maps a JSON object to an `ElementType` instance.
	 */
	protected abstract get elementClass(): new (
		json: Keyable,
	) => ElementType;

	/**
	 * Getter that must be overridden by subclasses to return the root element name
	 * for array-based JSON responses.
	 * @throws Error if not defined by the subclass.
	 */
	protected get rootElementName(): string {
		throw new Error(
			"rootElementName is not defined. Subclasses must override `rootElementName`.",
		);
	}

	/**
	 * Getter that may be overridden by subclasses to return the root element name
	 * for single-item JSON responses.
	 * @throws Error if not defined by the subclass.
	 */
	protected get rootElementNameSingular(): string | null {
		throw new Error(
			"rootElementNameSingular is not defined. Subclasses must override `rootElementNameSingular`.",
		);
	}

	/**
	 * Getter that may be overridden by subclasses if a secondary model type is returned.
	 * By default, this throws an error. If needed, override it in the subclass.
	 */
	protected get secondaryElementClass(): new (
		json: Keyable,
	) => SecondaryType {
		throw new Error(
			"Secondary elements are not supported by this collection. Override `secondaryElementClass` if needed.",
		);
	}

	/**
	 * Getter that must be overridden if `secondaryElementClass` is used.
	 * Returns the JSON property name for the secondary element.
	 * @throws Error if not defined by the subclass that uses secondary elements.
	 */
	protected get secondaryElementNameSingular(): string {
		throw new Error(
			"secondaryElementNameSingular is not defined. Subclasses must override this if secondary elements are used.",
		);
	}

	/**
	 * Perform a GET request that expects a list of items.
	 * @param params Optional query or request parameters.
	 * @returns A promise resolving to either a paginated result or an array of ElementType.
	 */
	protected doList(
		params: Keyable,
	): Promise<PaginatedResult<ElementType> | ElementType[]> {
		return this.createPromise("GET", params, this.populateArrayFromJson, null);
	}

	/**
	 * Perform a GET request that expects a cursor-paginated list of items.
	 * @param params Optional query or request parameters.
	 * @returns A promise resolving to a CursorPaginatedResult of ElementType.
	 */
	protected doListCursor(
		params: Keyable,
	): Promise<CursorPaginatedResult<ElementType>> {
		return this.createPromise(
			"GET",
			params,
			this.populateArrayFromJsonCursor,
			null,
		);
	}

	/**
	 * Perform a GET request to retrieve a single item by its ID.
	 * @param id The ID of the item to retrieve.
	 * @param params Optional query or request parameters.
	 * @returns A promise resolving to a single ElementType instance.
	 */
	protected doGet(
		id: string | number,
		params: Keyable = {},
	): Promise<ElementType> {
		return this.createPromise(
			"GET",
			{ ...params, id },
			this.populateObjectFromJsonRoot,
			null,
		);
	}

	/**
	 * Perform a DELETE request to remove a single item by its ID.
	 * @param id The ID of the item to delete.
	 * @param params Optional query or request parameters.
	 * @returns A promise resolving to JSON representing the deletion result.
	 */
	protected doDelete<T = Keyable | Keyable[]>(
		id: string | number,
		params: Keyable = {},
	): Promise<T> {
		return this.createPromise(
			"DELETE",
			{ ...params, id },
			this.returnBareJSON,
			null,
		) as Promise<T>;
	}

	/**
	 * Perform a POST request to create a new resource.
	 * @param body The object or array of objects to send in the request body.
	 * @param params Optional query or request parameters.
	 * @param resolveFn Optional custom resolve handler to parse the response.
	 * @returns A promise resolving to an ElementType or SecondaryType instance.
	 */
	protected doCreate(
		body: object | object[] | null,
		params: Keyable = {},
		resolveFn = this.populateObjectFromJson,
	): Promise<ElementType | SecondaryType> {
		return this.createPromise("POST", params, resolveFn, body);
	}

	/**
	 * Perform a POST request to create multiple resources at once.
	 * @param body The object or array of objects to send in the request body.
	 * @param params Optional query or request parameters.
	 * @param resolveFn Optional custom resolve handler to parse the response array.
	 * @returns A promise resolving to an array of ElementType.
	 */
	protected doCreateArray(
		body: object | object[] | null,
		params: Keyable,
		resolveFn: ResolveHandler<ElementType[]> = this.populateArray,
	): Promise<ElementType[]> {
		return this.createPromise("POST", params, resolveFn, body);
	}

	/**
	 * Perform an UPDATE (PUT/PATCH) request to modify an existing resource by its ID.
	 * @param id The ID of the item to update.
	 * @param body The updated fields to send in the request body.
	 * @param params Optional query or request parameters.
	 * @param resolveFn Optional custom resolve handler to parse the response object.
	 * @param method The HTTP method to use, typically PUT or PATCH.
	 * @returns A promise resolving to the updated ElementType instance.
	 */
	protected doUpdate(
		id: string | number,
		body: Keyable | null,
		params: Keyable,
		resolveFn = this.populateObjectFromJsonRoot,
		method: HttpMethod = "PUT",
	): Promise<ElementType> {
		return this.createPromise(method, { ...params, id }, resolveFn, body);
	}

	/**
	 * Parse a JSON response that contains a single item under a known root element name.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 * @returns The parsed ElementType instance.
	 * @throws Error if the expected root element name is missing.
	 */
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

	/**
	 * Parse a JSON response that contains a secondary item under a known secondary root element name.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 * @returns The parsed SecondaryType instance.
	 * @throws Error if the expected secondary element name is missing.
	 */
	protected populateSecondaryObjectFromJsonRoot(
		json: Keyable,
		headers: Headers,
	): SecondaryType {
		const root = this.secondaryElementNameSingular;
		const record = json as Record<string, unknown>;

		const itemJson = record[root];
		if (!itemJson) {
			throw new Error(
				`Missing expected secondary property '${root}' in JSON response.`,
			);
		}

		return this.populateObjectFromJson(
			itemJson,
			headers,
			true,
		) as SecondaryType;
	}

	/**
	 * Parse a JSON response that contains a secondary item.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 * @returns The parsed SecondaryType instance.
	 */
	protected populateSecondaryObjectFromJson(
		json: Keyable,
		headers: Headers,
	): SecondaryType {
		return this.populateObjectFromJson(json, headers, true) as SecondaryType;
	}

	/**
	 * Parse a JSON response that contains an array of items along with bulk result details.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 * @returns A BulkResult object containing items and potential errors.
	 * @throws Error if the expected root element is missing or not an array.
	 */
	protected populateArrayFromJsonBulk(
		json: Keyable,
		headers: Headers,
	): BulkResult {
		const root = this.rootElementName;
		const jsonArray = json[root];

		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${root}' but received: ${typeof jsonArray}`,
			);
		}

		const items: ElementType[] = jsonArray.map(
			(obj) => this.populateObjectFromJson(obj, headers) as ElementType,
		);

		return {
			errors: json.errors,
			items,
		};
	}

	/**
	 * Parse a JSON response that contains an array of items.
	 * If pagination headers are detected, returns a PaginatedResult.
	 * Otherwise, returns a plain array of ElementType.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 */
	protected populateArrayFromJson(
		json: Keyable,
		headers: Headers,
	): PaginatedResult<ElementType> | ElementType[] {
		const array = this.populateArray(json, headers);
		return this.isPaginated(headers)
			? new PaginatedResult<ElementType>(array, headers)
			: array;
	}

	/**
	 * Parse a JSON response that contains an array of items.
	 * This method returns a plain array and does not consider pagination.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 */
	protected populateArray(json: Keyable, headers: Headers): ElementType[] {
		const root = this.rootElementName;
		const jsonArray = json[root];

		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${root}' but received: ${typeof jsonArray}`,
			);
		}

		return jsonArray.map(
			(obj: Keyable) =>
				this.populateObjectFromJson(obj, headers) as ElementType,
		);
	}

	/**
	 * Parse a JSON response that contains a cursor-paginated array of items.
	 * @param json The raw JSON object returned by the API.
	 * @param headers The response headers.
	 */
	protected populateArrayFromJsonCursor(
		json: Keyable,
		headers: Headers,
	): CursorPaginatedResult<ElementType> {
		const root = this.rootElementName;
		const jsonArray = json[root];

		if (!Array.isArray(jsonArray)) {
			throw new Error(
				`Expected an array under '${root}' for cursor pagination but received: ${typeof jsonArray}`,
			);
		}

		const items = jsonArray.map(
			(obj: Keyable) =>
				this.populateObjectFromJson(obj, headers) as ElementType,
		);

		return new CursorPaginatedResult<ElementType>(items, headers);
	}

	/**
	 * Parse a JSON object into either an ElementType or a SecondaryType instance.
	 * @param json The raw JSON object returned by the API.
	 * @param _headers The response headers (if needed).
	 * @param secondary If true, use the secondaryElementClass instead of elementClass.
	 */
	protected populateObjectFromJson(
		json: Keyable,
		_headers: Headers,
		secondary = false,
	): ElementType | SecondaryType {
		const cls = secondary ? this.secondaryElementClass : this.elementClass;
		return new cls(json);
	}

	/**
	 * Return the raw JSON as-is.
	 * @param json The raw JSON object or array returned by the API.
	 */
	protected returnBareJSON<T>(json: Keyable | Keyable[]): T {
		return json as T;
	}

	/**
	 * Convert a single object into an array if it's not already an array.
	 * @param raw_body The raw request body.
	 */
	protected objToArray(raw_body: Keyable | Keyable[]): Keyable[] {
		return Array.isArray(raw_body) ? raw_body : [raw_body];
	}

	/**
	 * Create a Promise that sends an HTTP request and resolves with a parsed response.
	 * @param method The HTTP method (GET, POST, PUT, DELETE, etc.).
	 * @param params Query or request parameters.
	 * @param resolveFn A function to resolve and parse the JSON response.
	 * @param body The request body, if applicable.
	 * @param uri An explicit URI to use for the request. If not provided, prefixURI is used.
	 */
	protected async createPromise<T>(
		method: HttpMethod,
		params: Keyable,
		resolveFn: ResolveHandler<T>,
		body: object | object[] | null,
		uri: string | null = null,
	): Promise<T> {
		const request = await this.prepareRequest(method, body, params, uri);
		return resolveFn.call(
			this,
			request.response.json,
			request.response.headers,
		);
	}

	/**
	 * Prepare the API request by creating a new ApiRequest instance using the static async factory method.
	 * @param method The HTTP method.
	 * @param body The request body.
	 * @param params The request parameters.
	 * @param uri An explicit URI for the request or null.
	 */
	protected async prepareRequest(
		method: HttpMethod,
		body: object | object[] | null,
		params: Keyable,
		uri: string | null,
	): Promise<ApiRequest> {
		return await ApiRequest.create(
			this.getUri(uri),
			method,
			body,
			params,
			this.clientData,
		);
	}

	/**
	 * Determine the URI for the request. If uri is not provided, use prefixURI.
	 * @param uri An explicit URI or null.
	 * @throws Error if no URI or prefixURI is provided.
	 */
	protected getUri(uri: string | null): string {
		const childClass = this.constructor as typeof BaseCollection;
		const resolvedUri = uri ?? childClass.prefixURI;
		if (!resolvedUri) {
			throw new Error(
				"No URI or prefixURI provided. Ensure the subclass defines a static prefixURI or pass a URI explicitly.",
			);
		}
		return resolvedUri;
	}

	/**
	 * Determine if the response headers indicate pagination.
	 * @param headers The response headers.
	 */
	private isPaginated(headers: Headers): boolean {
		return (
			!!headers.get("x-pagination-total-count") &&
			!!headers.get("x-pagination-page")
		);
	}
}
