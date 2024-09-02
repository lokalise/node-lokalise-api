import { ApiRequest } from "../http_client/base.js";
import { CursorPaginatedResult } from "../models/cursor_paginated_result.js";
import { PaginatedResult } from "../models/paginated_result.js";
export class BaseCollection {
	clientData;
	static rootElementName;
	static rootElementNameSingular;
	static endpoint;
	static prefixURI;
	static elementClass;
	// Secondaries are used when an instance of a different class has to be created
	// For example, uploading a File may return a QueuedProcess
	static secondaryElementNameSingular;
	static secondaryElementClass;
	constructor(clientData) {
		this.clientData = clientData;
	}
	doList(req_params) {
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
	doListCursor(req_params) {
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
	doGet(id, req_params = {}) {
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
	doDelete(id, req_params = {}) {
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
	doCreate(body, req_params = {}, resolveFn = this.populateObjectFromJson) {
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
	doUpdate(
		id,
		body,
		req_params,
		resolveFn = this.populateObjectFromJsonRoot,
		method = "PUT",
	) {
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
	populateObjectFromJsonRoot(json, headers) {
		const childClass = this.constructor;
		if (childClass.rootElementNameSingular) {
			json = Object(json)[childClass.rootElementNameSingular];
		}
		return this.populateObjectFromJson(json, headers);
	}
	populateSecondaryObjectFromJsonRoot(json, headers) {
		const childClass = this.constructor;
		json = Object(json)[childClass.secondaryElementNameSingular];
		return this.populateObjectFromJson(json, headers, true);
	}
	populateObjectFromJson(json, _headers, secondary = false) {
		const childClass = this.constructor;
		if (secondary) {
			return new childClass.secondaryElementClass(json);
		} else {
			return new childClass.elementClass(json);
		}
	}
	populateArrayFromJsonBulk(json, headers) {
		const childClass = this.constructor;
		const arr = [];
		const jsonArray = json[childClass.rootElementName];
		for (const obj of jsonArray) {
			arr.push(this.populateObjectFromJson(obj, headers));
		}
		const result = {
			errors: json["errors"],
			items: arr,
		};
		return result;
	}
	populateArrayFromJson(json, headers) {
		const childClass = this.constructor;
		const arr = [];
		const jsonArray = json[childClass.rootElementName];
		for (const obj of jsonArray) {
			arr.push(this.populateObjectFromJson(obj, headers));
		}
		if (
			headers.get("x-pagination-total-count") &&
			headers.get("x-pagination-page")
		) {
			const result = new PaginatedResult(arr, headers);
			return result;
		} else {
			return arr;
		}
	}
	populateArrayFromJsonCursor(json, headers) {
		const childClass = this.constructor;
		const arr = [];
		const jsonArray = json[childClass.rootElementName];
		for (const obj of jsonArray) {
			arr.push(this.populateObjectFromJson(obj, headers));
		}
		return new CursorPaginatedResult(arr, headers);
	}
	populateApiErrorFromJson(json) {
		return json;
	}
	returnBareJSON(json) {
		return json;
	}
	handleReject(data) {
		return this.populateApiErrorFromJson(data);
	}
	async createPromise(method, params, resolveFn, rejectFn, body, uri = null) {
		const request = this.prepareRequest(method, body, params, uri);
		try {
			const data = await request.promise;
			let result = null;
			if (resolveFn !== null) {
				result = resolveFn.call(this, data["json"], data["headers"]);
			}
			return Promise.resolve(result);
		} catch (err) {
			return Promise.reject(rejectFn.call(this, err));
		}
	}
	prepareRequest(method, body, params, uri) {
		return new ApiRequest(
			this.getUri(uri),
			method,
			body,
			params,
			this.clientData,
		);
	}
	getUri(uri) {
		const childClass = this.constructor;
		if (!uri) {
			uri = childClass.prefixURI;
		}
		return uri;
	}
	objToArray(raw_body) {
		if (!Array.isArray(raw_body)) {
			return Array(raw_body);
		} else {
			return raw_body;
		}
	}
}
//# sourceMappingURL=base_collection.js.map
