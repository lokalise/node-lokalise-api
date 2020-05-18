"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCollection = void 0;
const base_1 = require("../http_client/base");
let BaseCollection = /** @class */ (() => {
    class BaseCollection {
        constructor() {
            // Workaround for handling HTTP header pagination params
            this.totalResults = null;
            this.totalPages = null;
            this.resultsPerPage = null;
            this.currentPage = null;
        }
        get(id, params = {}, body = null) {
            params["id"] = id;
            return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, body);
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
        populatePaginationDataFor(headers) {
            this.totalResults = parseInt(headers["x-pagination-total-count"]);
            this.totalPages = parseInt(headers["x-pagination-page-count"]);
            this.resultsPerPage = parseInt(headers["x-pagination-limit"]);
            this.currentPage = parseInt(headers["x-pagination-page"]);
            return;
        }
        populateObjectFromJsonRoot(json) {
            const childClass = this.constructor;
            if (childClass.rootElementNameSingular != null) {
                json = json[childClass.rootElementNameSingular];
            }
            return this.populateObjectFromJson(json);
        }
        populateSecondaryObjectFromJsonRoot(json) {
            const childClass = this.constructor;
            if (childClass.secondaryElementNameSingular != null) {
                json = json[childClass.secondaryElementNameSingular];
            }
            return this.populateObjectFromJson(json, true);
        }
        populateObjectFromJson(json, secondary = false) {
            const childClass = this.constructor;
            if (secondary) {
                return new childClass.secondaryElementClass(json);
            }
            else {
                return new childClass.elementClass(json);
            }
        }
        populateArrayFromJson(json) {
            const childClass = this.constructor;
            const arr = [];
            const jsonArray = json[childClass.rootElementName];
            for (const obj of jsonArray) {
                arr.push(this.populateObjectFromJson(obj));
            }
            return arr;
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
        createPromise(method, params, resolveFn, rejectFn = this.handleReject, body = null, uri = null) {
            const childClass = this.constructor;
            if (uri == null) {
                uri = childClass.prefixURI;
            }
            return new Promise((resolve, reject) => {
                const response = new base_1.ApiRequest(uri, method, body, params);
                response.promise
                    .then((result) => {
                    const headers = result["headers"];
                    this.populatePaginationDataFor(headers);
                    const json = result["body"];
                    resolve(resolveFn.call(this, json));
                })
                    .catch((data) => {
                    reject(rejectFn.call(this, data));
                });
            });
        }
    }
    BaseCollection.rootElementName = "";
    BaseCollection.rootElementNameSingular = null;
    BaseCollection.endpoint = null;
    BaseCollection.prefixURI = null;
    BaseCollection.elementClass = null;
    // Secondaries are used when an instance of a different class has to be created
    // For example, uploading a File may return a QueuedProcess
    BaseCollection.secondaryElementNameSingular = null;
    BaseCollection.secondaryElementClass = null;
    return BaseCollection;
})();
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=base_collection.js.map