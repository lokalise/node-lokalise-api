"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class BaseModel {
    get(id, params = {}, body = null) {
        return this.createPromise('GET', { id: id }, this.populateObjectFromJson, this.handleReject, body);
    }
    list(params = {}) {
        return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null);
    }
    create(body, params = {}) {
        return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
    }
    update(body, params = {}) {
        return this.createPromise('PUT', params, this.populateObjectFromJson, this.handleReject, body);
    }
    delete(id, params = {}) {
        return this.createPromise('DELETE', { id: id }, this.populateObjectFromJson, this.handleReject, null);
    }
    populateObjectFromJson(json) {
        for (let key in json) {
            this[key] = json[key];
        }
        return this;
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
        return data;
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
            }).then((data) => {
                reject(rejectFn.call(this, data));
            });
        });
    }
}
BaseModel.rootElementName = null;
BaseModel.endpoint = null;
BaseModel.prefixURI = null;
exports.BaseModel = BaseModel;
//# sourceMappingURL=base_model.js.map