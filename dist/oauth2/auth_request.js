"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRequest = void 0;
const got = require("got");
const pkg = require("../../package.json");
class AuthRequest {
    constructor(uri, method, body, params, clientData) {
        this.params = {};
        this.params = params;
        this.promise = this.createPromise(uri, method, body, clientData);
    }
    async createPromise(uri, method, body, authData) {
        console.log(authData);
        const options = {
            method: method,
            prefixUrl: AuthRequest.urlRoot,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${pkg.version}`,
            },
            agent: false,
            throwHttpErrors: false,
            decompress: false,
        };
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
        try {
            const response = await got(uri, options);
            const responseJSON = JSON.parse(response.body);
            if (response.statusCode > 299) {
                return Promise.reject(responseJSON["error"] || responseJSON);
            }
            return Promise.resolve({ json: responseJSON, headers: response.headers });
        }
        catch (err) {
            /* istanbul ignore next */
            return Promise.reject(err);
        }
    }
}
exports.AuthRequest = AuthRequest;
AuthRequest.urlRoot = "https://app.lokalise.com/oauth2/";
//# sourceMappingURL=auth_request.js.map