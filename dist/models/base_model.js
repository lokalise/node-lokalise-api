"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../http_client/base");
class BaseModel {
    get(id) {
        let childClass = this.constructor;
        let endpoint = childClass.endpoint;
        let uri = endpoint + '/' + id;
        console.log(this.composeURI({ id: 1 }));
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest(uri, 'GET');
            response.promise.then((result) => {
                resolve(this.populateObjectFromJson(result));
            }).then((data) => {
                reject(data);
            });
        });
    }
    list() {
        return new Promise((resolve, reject) => {
            let childClass = this.constructor;
            let rootElementName = childClass.rootElementName;
            let endpoint = childClass.endpoint;
            let uri = endpoint;
            let response = new base_1.ApiRequest(uri, 'GET');
            response.promise.then((result) => {
                if (result[rootElementName]) {
                    resolve(this.populateArrayFromJson(result[rootElementName]));
                }
                else {
                    reject('Server returned incorrect format');
                }
            }).then((data) => {
                reject(data);
            });
        });
    }
    create(params) {
        let childClass = this.constructor;
        let endpoint = childClass.endpoint;
        let uri = endpoint;
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest(uri, 'POST', params);
            response.promise.then((result) => {
                resolve(this.populateObjectFromJson(result));
            }).then((data) => {
                reject(data);
            });
        });
    }
    update(params) {
        let childClass = this.constructor;
        let endpoint = childClass.endpoint;
        let uri = endpoint;
        return new Promise((resolve, reject) => {
            let response = new base_1.ApiRequest(uri, 'PUT', params);
            response.promise.then((result) => {
                resolve(this.populateObjectFromJson(result));
            }).then((data) => {
                reject(data);
            });
        });
    }
    composeURI(params) {
        let regexp = /{(\!{0,1})(\w*)\}/g;
        let childClass = this.constructor;
        let matches = childClass.prefixURI.replace(regexp, this.constructURI(entity, isMandaratory, paramName, params));
    }
    constructURI(entity, isMandaratory, paramName, params) {
        let str = paramsName;
        if (params[paramName]) {
            return z;
        }
        else {
            if (isMandaratory == '!') {
                throw new Error('Reqeuired params');
            }
            else {
                '';
            }
        }
    }
    populateObjectFromJson(json) {
        for (let key in json) {
            this[key] = json[key];
        }
        return this;
    }
    populateArrayFromJson(json) {
        let arr = new Array();
        for (let obj of json) {
            arr.push(this.populateObjectFromJson(obj));
        }
        return arr;
    }
}
BaseModel.rootElementName = null;
BaseModel.endpoint = null;
BaseModel.prefixURI = null;
exports.BaseModel = BaseModel;
//# sourceMappingURL=base_model.js.map