import { ApiRequest } from "../http_client/base.js";
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
    doUpdate(id, body, req_params, resolveFn = this.populateObjectFromJsonRoot) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("PUT", params, resolveFn, this.handleReject, body);
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
        }
        else {
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
        if (headers["x-pagination-total-count"] && headers["x-pagination-page"]) {
            const result = new PaginatedResult(arr, headers);
            return result;
        }
        else {
            return arr;
        }
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
        const childClass = this.constructor;
        if (!uri) {
            uri = childClass.prefixURI;
        }
        const request = new ApiRequest(uri, method, body, params, this.clientData);
        try {
            const data = await request.promise;
            return Promise.resolve(resolveFn.call(this, data["json"], data["headers"]));
        }
        catch (err) {
            return Promise.reject(rejectFn.call(this, err));
        }
    }
    objToArray(raw_body) {
        if (!Array.isArray(raw_body)) {
            return Array(raw_body);
        }
        else {
            return raw_body;
        }
    }
}
//# sourceMappingURL=base_collection.js.map