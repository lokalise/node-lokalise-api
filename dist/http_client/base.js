"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require('got');
const lokalise_1 = require("../lokalise/lokalise");
class ApiRequest {
    constructor(uri, method, body = null, params = {}) {
        this.urlRoot = 'https://api.lokalise.com/api2/';
        this.params = {};
        this.params = params;
        this.promise = this.createPromise(uri, method, body);
        return this;
    }
    createPromise(uri, method, body) {
        let options = {
            method: method,
            headers: { 'x-api-token': lokalise_1.LokaliseApi.apiKey },
            agent: false
        };
        if (Object.keys(this.params).length > 0) {
            options['searchParams'] = (new URLSearchParams(this.params)).toString();
        }
        if (body) {
            options['body'] = JSON.stringify(body);
        }
        return new Promise((resolve, reject) => {
            got(this.urlRoot + this.composeURI(uri), options).then((response) => {
                let responseJSON = JSON.parse(response.body);
                if (responseJSON['error'] || (responseJSON['errors'] && responseJSON['errors'].length != 0)) {
                    reject(responseJSON['error'] || responseJSON['errors'] || responseJSON);
                    return;
                }
                // Workaround to pass header parameters
                let result = {};
                result['headers'] = response.headers;
                result['body'] = responseJSON;
                resolve(result);
                return;
            }).then((error) => {
                reject(error);
                return;
            }).catch((error) => {
                reject(error);
                return;
            });
        });
    }
    composeURI(uri) {
        let regexp = /{(!{0,1}):(\w*)}/g;
        return uri.replace(regexp, this.mapUriParams(this.params));
    }
    mapUriParams(params) {
        return (entity, isMandaratory, paramName) => {
            if (params[paramName] != null) {
                let t_param = params[paramName];
                delete this.params[paramName];
                return t_param;
            }
            else {
                if (isMandaratory == '!') {
                    throw new Error('Required param ' + paramName);
                }
                else {
                    return '';
                }
            }
        };
    }
    constructParameters(method, params) { }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=base.js.map