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
            headers: { 'x-api-token': lokalise_1.LokaliseApi.apiKey, 'content-type': 'application/json' }
        };
        if (Object.keys(params).length > 0) {
            options['body'] = JSON.stringify(params);
        }
        console.log(options);
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
    constructParameters(method, params) { }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=base.js.map