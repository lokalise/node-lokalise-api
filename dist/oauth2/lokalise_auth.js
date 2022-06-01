"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LokaliseAuth = void 0;
const auth_request_1 = require("./auth_request");
class LokaliseAuth {
    /*
     * Instantiate LokaliseAuth to work with OAuth 2 tokens
     * @param clientId      string, mandatory
     * @param clientSecret  string, mandatory
     * @returns             LokaliseAuth object to work with.
     */
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
    auth(scope, redirect_uri, state) {
        if (scope instanceof Array) {
            scope = scope.join(" ");
        }
        const params = {
            client_id: this.authData.client_id,
            scope: scope,
        };
        if (state) {
            params["state"] = state;
        }
        if (redirect_uri) {
            params["redirect_uri"] = redirect_uri;
        }
        return this.buildUrl(params);
    }
    async token(code) {
        const params = {
            ...this.base_params(),
            ...{
                code: code,
                grant_type: "authorization_code",
            },
        };
        return await this.doRequest(params);
    }
    async refresh(refresh_token) {
        const params = {
            ...this.base_params(),
            ...{
                refresh_token: refresh_token,
                grant_type: "refresh_token",
            },
        };
        return await this.doRequest(params);
    }
    async doRequest(params) {
        try {
            const data = await auth_request_1.AuthRequest.createPromise("token", "POST", params);
            return Promise.resolve(data["json"]);
        }
        catch (err) {
            return Promise.reject(this.handleReject(err));
        }
    }
    buildUrl(params) {
        const url = new URL("auth", auth_request_1.AuthRequest.urlRoot);
        const sParams = new URLSearchParams(params);
        url.search = sParams.toString();
        return url.toString();
    }
    base_params() {
        return {
            client_id: this.authData.client_id,
            client_secret: this.authData.client_secret,
        };
    }
    handleReject(data) {
        return data;
    }
}
exports.LokaliseAuth = LokaliseAuth;
//# sourceMappingURL=lokalise_auth.js.map