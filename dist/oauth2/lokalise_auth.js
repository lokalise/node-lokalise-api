import { AuthRequest } from "./auth_request.js";
export class LokaliseAuth {
    authData = {
        client_id: "",
        client_secret: "",
    };
    /*
     * Instantiate LokaliseAuth to work with OAuth 2 tokens
     * @param clientId      string, mandatory
     * @param clientSecret  string, mandatory
     * @returns             LokaliseAuth object to work with.
     */
    constructor(clientId, clientSecret, host, version) {
        if (clientId == null ||
            clientId.length === 0 ||
            clientSecret == null ||
            clientSecret.length === 0) {
            throw new Error("Error: Instantiation failed: Please pass client id and client secret");
        }
        this.authData.client_id = clientId;
        this.authData.client_secret = clientSecret;
        this.authData.host = host ?? "https://app.lokalise.com";
        this.authData.version = version ?? "oauth2";
    }
    auth(scope, redirect_uri, state) {
        const scopeString = Array.isArray(scope) ? scope.join(" ") : scope;
        const params = {
            client_id: this.authData.client_id,
            scope: scopeString,
            ...(state && { state }),
            ...(redirect_uri && { redirect_uri }),
        };
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
            const data = await AuthRequest.createPromise("token", "POST", params, this.authData);
            return data.json;
        }
        catch (err) {
            return Promise.reject(this.handleReject(err));
        }
    }
    buildUrl(params) {
        const url = new URL("auth", this.authData.host);
        url.search = new URLSearchParams(params).toString();
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
//# sourceMappingURL=lokalise_auth.js.map