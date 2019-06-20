"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class BaseCollection {
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
        let arr = new Array();
        let jsonArray = json[childClass.rootElementName];
        for (let obj of jsonArray) {
            arr.push(this.populateObjectFromJson(obj));
        }
        return arr;
    }
    returnBareJSON(json) {
        return json;
    }
    handleReject(data) {
        console.log(data);
        return;
    }
    createPromise(method, params, resolveFn, rejectFn = this.handleReject, body = null, uri = null) {
        let childClass = this.constructor;
        if (uri == null) {
            uri = childClass.prefixURI;
        }
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest(uri, method, body, params);
            response.promise.then((result) => {
                resolve(resolveFn.call(this, result));
            }).catch((data) => {
                reject(rejectFn.call(this, data));
            });
        });
    }
}
BaseCollection.rootElementName = null;
BaseCollection.rootElementNameSingular = null;
BaseCollection.endpoint = null;
BaseCollection.prefixURI = null;
BaseCollection.elementClass = null;
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=base_collection.js.map