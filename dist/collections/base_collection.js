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
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null);
    }
    doListCursor(req_params) {
        const params = {
            ...req_params,
        };
        return this.createPromise("GET", params, this.populateArrayFromJsonCursor, this.handleReject, null);
    }
    doGet(id, req_params = {}) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
    doDelete(id, req_params = {}) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("DELETE", params, this.returnBareJSON, this.handleReject, null);
    }
    doCreate(body, req_params = {}, resolveFn = this.populateObjectFromJson) {
        const params = {
            ...req_params,
        };
        return this.createPromise("POST", params, resolveFn, this.handleReject, body);
    }
    doUpdate(id, body, req_params, resolveFn = this.populateObjectFromJsonRoot, method = "PUT") {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise(method, params, resolveFn, this.handleReject, body);
    }
    populateObjectFromJsonRoot(json, headers) {
        const childClass = this.constructor;
        let jsonData = json;
        if (childClass.rootElementNameSingular) {
            jsonData = Object(jsonData)[childClass.rootElementNameSingular];
        }
        return this.populateObjectFromJson(jsonData, headers);
    }
    populateSecondaryObjectFromJsonRoot(json, headers) {
        const childClass = this.constructor;
        const secondaryJson = Object(json)[childClass.secondaryElementNameSingular];
        return this.populateObjectFromJson(secondaryJson, headers, true);
    }
    populateObjectFromJson(json, _headers, secondary = false) {
        const childClass = this.constructor;
        return secondary
            ? new childClass.secondaryElementClass(json)
            : new childClass.elementClass(json);
    }
    populateArrayFromJsonBulk(json, headers) {
        const childClass = this.constructor;
        const arr = [];
        const jsonArray = json[childClass.rootElementName];
        for (const obj of jsonArray) {
            arr.push(this.populateObjectFromJson(obj, headers));
        }
        const result = {
            errors: json.errors,
            items: arr,
        };
        return result;
    }
    populateArrayFromJson(json, headers) {
        const resultArray = this.populateArray(json, headers);
        return this.isPaginated(headers)
            ? new PaginatedResult(resultArray, headers)
            : resultArray;
    }
    populateArray(json, headers) {
        const childClass = this.constructor;
        return json[childClass.rootElementName].map((obj) => this.populateObjectFromJson(obj, headers));
    }
    isPaginated(headers) {
        return (!!headers.get("x-pagination-total-count") &&
            !!headers.get("x-pagination-page"));
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
            const data = await this.sendRequest(request);
            return resolveFn ? resolveFn.call(this, data.json, data.headers) : null;
        }
        catch (err) {
            return this.handleError(err, rejectFn);
        }
    }
    sendRequest(request) {
        return request.promise;
    }
    handleError(err, rejectFn) {
        return Promise.reject(rejectFn.call(this, err));
    }
    prepareRequest(method, body, params, uri) {
        return new ApiRequest(this.getUri(uri), method, body, params, this.clientData);
    }
    getUri(uri) {
        const childClass = this.constructor;
        // Use a local variable instead of reassigning the parameter
        const resolvedUri = uri ? uri : childClass.prefixURI;
        return resolvedUri;
    }
    objToArray(raw_body) {
        if (!Array.isArray(raw_body)) {
            return Array(raw_body);
        }
        return raw_body;
    }
}
//# sourceMappingURL=base_collection.js.map