"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseAuth = void 0;
const auth_request_1 = require("./auth_request");
class LokaliseAuth {
    constructor(clientId, clientSecret) {
        this.authData = {
            client_id: "",
            client_secret: "",
        };
        if (clientId == null ||
            clientId.length == 0 ||
            clientSecret == null ||
            clientSecret.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass client id and client secret");
        }
        this.authData.client_id = clientId;
        this.authData.client_secret = clientSecret;
    }
    auth(scope, redirect_uri = null, state = null) {
        if (scope instanceof Array) {
            scope = scope.join(" ");
        }
        const params = {
            client_id: this.authData.client_id,
            scope: scope,
        };
        if (state != null) {
            params["state"] = state;
        }
        if (redirect_uri != null) {
            params["redirect_uri"] = redirect_uri;
        }
        return this.buildUrl(params);
    }
    buildUrl(params) {
        const url = new URL("auth", auth_request_1.AuthRequest.urlRoot);
        const sParams = new URLSearchParams(params);
        url.search = sParams.toString();
        return url.toString();
    }
}
exports.LokaliseAuth = LokaliseAuth;
//# sourceMappingURL=lokalise_auth.js.map