"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const lokalise_1 = require("../lokalise/lokalise");
class ApiRequest {
    constructor(uri, method, body = null, params = {}) {
        this.urlRoot = 'https://api.lokalise.co/api2/';
        this.params = {};
        this.params = params;
        this.promise = this.createPromise(uri, method, body);
        return this;
    }
    createPromise(uri, method, body) {
        let options = {
            url: this.urlRoot + this.composeURI(uri),
            method: method,
            headers: { 'x-api-token': lokalise_1.LokaliseApi.apiKey, 'content-type': 'application/json' }
        };
        if (Object.keys(this.params).length > 0) {
            options['qs'] = this.params;
        }
        if (body) {
            options['body'] = JSON.stringify(body);
        }
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                else {
                    let responseJSON = JSON.parse(body);
                    if (responseJSON['error'] || (responseJSON['errors'] && responseJSON['errors'].length != 0)) {
                        reject(responseJSON['error'] || responseJSON['errors'] || responseJSON);
                        return;
                    }
                    resolve(responseJSON);
                    return;
                }
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