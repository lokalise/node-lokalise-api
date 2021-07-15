"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequest = void 0;
const got = require("got");
const pkg = require("../../package.json");
const lokalise_1 = require("../lokalise/lokalise");
class ApiRequest {
    constructor(uri, method, body, params) {
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
                "X-Api-Token": lokalise_1.LokaliseApi.apiKey,
                "User-Agent": `node-lokalise-api/${pkg.version}`,
            },
            agent: false,
            throwHttpErrors: false,
            decompress: false,
        };
        if (lokalise_1.LokaliseApi.enableCompression && options["headers"]) {
            options["headers"]["Accept-Encoding"] = "gzip,deflate";
            options["decompress"] = true;
        }
        const url = this.composeURI(uri);
        if (Object.keys(this.params).length > 0) {
            const formattedParams = new URLSearchParams();
            Object.entries(this.params).forEach(([key, value]) => {
                formattedParams.set(key, value);
            });
            options["searchParams"] = formattedParams.toString();
        }
        if (method !== "GET" && body) {
            options["body"] = JSON.stringify(body);
        }
        return new Promise((resolve, reject) => {
            got(url, options)
                .then((response) => {
                const responseJSON = JSON.parse(response.body);
                if (response.statusCode > 299) {
                    /* istanbul ignore next */
                    reject(responseJSON["error"] || responseJSON);
                    return;
                }
                resolve({ json: responseJSON, headers: response.headers });
                return;
            })
                .then((error) => {
                reject(error);
                return error;
            })
                /* istanbul ignore next */
                .catch((error) => {
                /* istanbul ignore next */
                reject(error);
                /* istanbul ignore next */
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