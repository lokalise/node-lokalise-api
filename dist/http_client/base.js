import { LokalisePkg } from "../lokalise/pkg.js";
export class ApiRequest {
    promise;
    params = {};
    urlRoot = "https://api.lokalise.com/api2/";
    constructor(uri, method, body, params, clientData) {
        // Since we modify params, we need to make a copy of it so we don't modify the original
        this.params = { ...params };
        this.promise = this.createPromise(uri, method, body, clientData);
    }
    async createPromise(uri, method, body, clientData) {
        const url = this.composeURI(`/${clientData.version}/${uri}`);
        const prefixUrl = clientData.host ?? this.urlRoot;
        const headers = await this.buildHeaders(clientData, method, body);
        const options = {
            method: method,
            headers: headers,
            ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
        };
        const target = new URL(url, prefixUrl);
        target.search = new URLSearchParams(this.params).toString();
        return this.fetchAndHandleResponse(target, options);
    }
    async fetchAndHandleResponse(target, options) {
        try {
            const response = await fetch(target, options);
            return this.processResponse(response);
        }
        catch (err) {
            return Promise.reject({ message: err.message });
        }
    }
    async processResponse(response) {
        let responseJSON = null;
        try {
            if (response.status === 204) {
                responseJSON = null;
            }
            else {
                responseJSON = await response.json();
            }
        }
        catch (_error) {
            return Promise.reject({
                message: response.statusText,
                code: response.status,
            });
        }
        if (response.ok) {
            return {
                json: responseJSON,
                headers: response.headers,
            };
        }
        return Promise.reject(this.getErrorFromResp(responseJSON));
    }
    async buildHeaders(clientData, method, body) {
        const headers = new Headers({
            Accept: "application/json",
            "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
        });
        headers.append(clientData.authHeader, `${clientData.tokenType} ${clientData.token}`);
        if (clientData.enableCompression) {
            headers.append("Accept-Encoding", "gzip,deflate");
        }
        if (method !== "GET" && body) {
            headers.append("Content-type", "application/json");
        }
        return headers;
    }
    getErrorFromResp(respJson) {
        if (typeof respJson.error === "object") {
            return respJson.error;
        }
        return respJson;
    }
    composeURI(rawUri) {
        const regexp = /{(!{0,1}):(\w*)}/g;
        const uri = rawUri.replace(regexp, this.mapUriParams());
        return uri.endsWith("/") ? uri.slice(0, -1) : uri;
    }
    mapUriParams() {
        return (_entity, isMandaratory, paramName) => {
            if (this.params[paramName] != null) {
                const t_param = this.params[paramName];
                // We delete the param so we don't send it as a query param as well.
                delete this.params[paramName];
                return t_param;
            }
            if (isMandaratory === "!") {
                throw new Error(`Missing required param: ${paramName}`);
            }
            return "";
        };
    }
}
//# sourceMappingURL=base.js.map