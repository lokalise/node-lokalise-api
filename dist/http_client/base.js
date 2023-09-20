import { LokalisePkg } from "../lokalise/pkg.js";
export class ApiRequest {
    promise;
    params = {};
    urlRoot = "https://api.lokalise.com/api2/";
    constructor(uri, method, body, params, clientData) {
        // Since we modify params, we need to make a copy of it so we don't modify the original
        this.params = { ...params };
        this.promise = this.createPromise(uri, method, body, clientData);
        return this;
    }
    async createPromise(uri, method, body, clientData) {
        if (clientData.version)
            uri = `/${clientData.version}/${uri}`;
        const url = this.composeURI(uri);
        const prefixUrl = clientData.host ?? this.urlRoot;
        const options = {
            method: method,
        };
        const headers = new Headers({
            Accept: "application/json",
            "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
        });
        headers.append(clientData.authHeader, `${clientData.tokenType} ${clientData.token}`);
        if (clientData.enableCompression) {
            headers.append("Accept-Encoding", "gzip,deflate");
        }
        if (method !== "GET" && body) {
            options.body = JSON.stringify(body);
            headers.append("Content-type", "application/json");
        }
        options.headers = headers;
        const target = new URL(url, prefixUrl);
        target.search = new URLSearchParams(this.params).toString();
        try {
            const response = await fetch(target, options);
            const responseJSON = response.body ? await response.json() : null;
            if (response.ok) {
                return Promise.resolve({
                    json: responseJSON,
                    headers: response.headers,
                });
            }
            return Promise.reject(this.getErrorFromResp(responseJSON));
        }
        catch (err) {
            console.error(err);
            return Promise.reject({ message: err.message });
        }
    }
    getErrorFromResp(respJson) {
        if (typeof respJson["error"] === "object") {
            return respJson["error"];
        }
        else {
            return respJson;
        }
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
            else {
                if (isMandaratory === "!") {
                    /* c8 ignore next */
                    throw new Error("Required param " + paramName);
                }
                else {
                    return "";
                }
            }
        };
    }
}
//# sourceMappingURL=base.js.map