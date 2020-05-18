"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const got = require("got");
const pkg = require("../../package.json");
const lokalise_1 = require("../lokalise/lokalise");
class ApiRequest {
    constructor(uri, method, body = null, params = {}) {
        this.urlRoot = "https://api.lokalise.com/api2/";
        this.params = {};
        this.params = params;
        this.promise = this.createPromise(uri, method, body);
        return this;
    }
    createPromise(uri, method, body) {
        const options = {
            method: method,
            prefixUrl: this.urlRoot,
            headers: {
                "x-api-token": lokalise_1.LokaliseApi.apiKey,
                "user-agent": `node-lokalise-api/${pkg.version}`,
            },
            agent: false,
            throwHttpErrors: false,
            decompress: false,
        };
        const url = this.composeURI(uri);
        if (Object.keys(this.params).length > 0) {
            options["searchParams"] = new URLSearchParams(this.params).toString();
        }
        if (method != "GET" && body) {
            options["body"] = JSON.stringify(body);
        }
        return new Promise((resolve, reject) => {
            got(url, options)
                .then((response) => {
                const responseJSON = JSON.parse(response.body);
                if (responseJSON["error"] ||
                    (responseJSON["errors"] && responseJSON["errors"].length != 0)) {
                    reject(responseJSON["error"] || responseJSON["errors"] || responseJSON);
                    return;
                }
                // Workaround to pass header parameters
                const result = {};
                result["headers"] = response.headers;
                result["body"] = responseJSON;
                resolve(result);
                return;
            })
                .then((error) => {
                reject(error.code);
                return error;
            })
                .catch((error) => {
                reject(error);
                return error;
            });
        });
    }
    composeURI(uri) {
        const regexp = /{(!{0,1}):(\w*)}/g;
        return uri.replace(regexp, this.mapUriParams(this.params));
    }
    mapUriParams(params) {
        return (_entity, isMandaratory, paramName) => {
            if (params[paramName] != null) {
                const t_param = params[paramName];
                delete this.params[paramName];
                return t_param;
            }
            else {
                if (isMandaratory == "!") {
                    throw new Error("Required param " + paramName);
                }
                else {
                    return "";
                }
            }
        };
    }
}
exports.ApiRequest = ApiRequest;
//# sourceMappingURL=base.js.map