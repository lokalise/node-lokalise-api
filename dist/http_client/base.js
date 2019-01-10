"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const lokalise_1 = require("../lokalise/lokalise");
class ApiRequest {
    constructor(uri, method, params = {}) {
        this.urlRoot = 'https://api.lokalise.co/api2/';
        this.promise = this.createPromise(uri, method, params);
        return this;
    }
    createPromise(uri, method, params) {
        let options = {
            url: this.urlRoot + uri,
            method: method,
            headers: { 'x-api-token': lokalise_1.LokaliseApi.apiKey }
        };
        if (params.length > 0) {
            options['postData'] = params;
        }
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    console.log(body);
                    resolve(JSON.parse(body));
                }
            });
        });
    }
    constructParameters(method, params) {
    }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=base.js.map