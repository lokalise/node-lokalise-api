"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class BaseCollection {
    constructor() {
        // Workaround for handling HTTP header pagination params
        this.totalResults = null;
        this.totalPages = null;
        this.resultsPerPage = null;
        this.currentPage = null;
    }
    get(id, params = {}, body = null) {
        params['id'] = id;
        return this.createPromise('GET', params, this.populateObjectFromJsonRoot, this.handleReject, body);
    }
    list(params = {}) {
        return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null);
    }
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
    }
    update(id, body, params = {}) {
        params['id'] = id;
        return this.createPromise('PUT', params, this.populateObjectFromJson, this.handleReject, body);
    }
    delete(id, params = {}) {
        params['id'] = id;
        return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, null);
    }
    populatePaginationDataFor(headers) {
        this.totalResults = parseInt(headers['x-pagination-total-count']);
        this.totalPages = parseInt(headers['x-pagination-page-count']);
        this.resultsPerPage = parseInt(headers['x-pagination-limit']);
        this.currentPage = parseInt(headers['x-pagination-page']);
    }
    populateObjectFromJsonRoot(json) {
        let childClass = this.constructor;
        if (childClass.rootElementNameSingular != null) {
            json = json[childClass.rootElementNameSingular];
        }
        return this.populateObjectFromJson(json);
    }
    populateObjectFromJson(json) {
        let childClass = this.constructor;
        return new childClass.elementClass(json);
    }
    populateArrayFromJson(json) {
        let childClass = this.constructor;
        let arr = [];
        let jsonArray = json[childClass.rootElementName];
        for (let obj of jsonArray) {
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
        let childClass = this.constructor;
        if (uri == null) {
            uri = childClass.prefixURI;
        }
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest(uri, method, body, params);
            response.promise.then((result) => {
                let headers = result['headers'];
                this.populatePaginationDataFor(headers);
                let json = result['body'];
                resolve(resolveFn.call(this, json));
            }).catch((data) => {
                reject(rejectFn.call(this, data));
            });
        });
    }
}
exports.BaseCollection = BaseCollection;
BaseCollection.rootElementName = '';
BaseCollection.rootElementNameSingular = null;
BaseCollection.endpoint = null;
BaseCollection.prefixURI = null;
BaseCollection.elementClass = null;
//# sourceMappingURL=base_collection.js.map