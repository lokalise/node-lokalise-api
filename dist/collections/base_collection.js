"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCollection = void 0;
const base_1 = require("../http_client/base");
const paginated_result_1 = require("../models/paginated_result");
class BaseCollection {
    clientData;
    static rootElementName = "";
    static rootElementNameSingular = null;
    static endpoint = null;
    static prefixURI = null;
    static elementClass = null;
    // Secondaries are used when an instance of a different class has to be created
    // For example, uploading a File may return a QueuedProcess
    static secondaryElementNameSingular = null;
    static secondaryElementClass = null;
    constructor(clientData) {
        this.clientData = clientData;
    }
    doList(params = {}) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null);
    }
    doGet(id, params = {}) {
        params["id"] = id;
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
    doDelete(id, params = {}) {
        params["id"] = id;
        return this.createPromise("DELETE", params, this.returnBareJSON, this.handleReject, null);
    }
    get(id, params = {}) {
        params["id"] = id;
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
    list(params = {}) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null);
    }
    create(body, params = {}) {
        return this.createPromise("POST", params, this.populateObjectFromJson, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params["id"] = id;
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, body);
    }
    delete(id, params = {}) {
        params["id"] = id;
        return this.createPromise("DELETE", params, this.returnBareJSON, this.handleReject, null);
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
        if (Object(headers)["x-pagination-total-count"] &&
            Object(headers)["x-pagination-page"]) {
            const result = new paginated_result_1.PaginatedResult(arr, headers);
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
        const request = new base_1.ApiRequest(uri, method, body, params, this.clientData);
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
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=base_collection.js.map