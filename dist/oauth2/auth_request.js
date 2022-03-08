"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRequest = void 0;
const got = require("got");
const pkg = require("../../package.json");
class AuthRequest {
    static async createPromise(uri, method, body) {
        const options = {
            method: method,
            prefixUrl: this.urlRoot,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${pkg.version}`,
            },
            agent: false,
            throwHttpErrors: false,
            decompress: false,
        };
        options["body"] = JSON.stringify(body);
        try {
            const response = await got(uri, options);
            const responseJSON = JSON.parse(response.body);
            if (response.statusCode > 399) {
                return Promise.reject({
                    ...{ code: response.statusCode },
                    ...responseJSON,
                });
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