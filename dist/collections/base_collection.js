"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCollection = void 0;
const base_1 = require("../http_client/base");
const paginated_result_1 = require("../models/paginated_result");
class BaseCollection {
    constructor(clientData) {
        this.clientData = clientData;
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
            // Handle rare cases when the response is success but there were errors along with other data
            // Currently, it can only happen when creating or updating items in bulk
            if (json["errors"]) {
                const result = {
                    errors: json["errors"],
                    items: arr,
                };
                return result;
            }
            else {
                return arr;
            }
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
        return new Promise((resolve, reject) => {
            const response = new base_1.ApiRequest(uri, method, body, params, this.clientData);
            response.promise
                .then((data) => {
                resolve(resolveFn.call(this, data["json"], data["headers"]));
            })
                .catch((data) => {
                reject(rejectFn.call(this, data));
            });
        });
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
BaseCollection.rootElementName = "";
BaseCollection.rootElementNameSingular = null;
BaseCollection.endpoint = null;
BaseCollection.prefixURI = null;
BaseCollection.elementClass = null;
// Secondaries are used when an instance of a different class has to be created
// For example, uploading a File may return a QueuedProcess
BaseCollection.secondaryElementNameSingular = null;
BaseCollection.secondaryElementClass = null;
//# sourceMappingURL=base_collection.js.map