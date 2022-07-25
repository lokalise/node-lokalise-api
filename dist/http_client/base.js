import got, { Options } from "got";
import { readFile } from "fs/promises";
const pkg = JSON.parse((await readFile("../../package.json")).toString());
export class ApiRequest {
    urlRoot = "https://api.lokalise.com/api2/";
    promise;
    params = {};
    constructor(uri, method, body, params, clientData) {
        this.params = params;
        this.promise = this.createPromise(uri, method, body, clientData);
        return this;
    }
    async createPromise(uri, method, body, clientData) {
        const options = new Options({
            method: method,
            prefixUrl: this.urlRoot,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${pkg.version}`,
            },
            throwHttpErrors: false,
            decompress: false,
            responseType: "text",
        });
        // Make strictNullChecks happy
        if (!options["headers"]) {
            /* istanbul ignore next */
            options["headers"] = {};
        }
        options["headers"][clientData.authHeader] = `${clientData.tokenType} ${clientData.token}`;
        if (clientData.enableCompression) {
            options["headers"]["Accept-Encoding"] = "gzip,deflate";
            options["decompress"] = true;
        }
        const url = this.composeURI(uri);
        if (Object.keys(this.params).length > 0) {
            const formattedParams = new URLSearchParams(this.params);
            options["searchParams"] = formattedParams.toString();
        }
        if (method !== "GET" && body) {
            options["body"] = JSON.stringify(body);
        }
        try {
            const response = await got(url, options);
            const responseJSON = JSON.parse(response.body);
            if (response.statusCode > 399) {
                return Promise.reject(responseJSON["error"] || responseJSON);
            }
            return Promise.resolve({ json: responseJSON, headers: response.headers });
        }
        catch (err) {
            /* istanbul ignore next */
            return Promise.reject(err);
        }
    }
    composeURI(rawUri) {
        const regexp = /{(!{0,1}):(\w*)}/g;
        const uri = rawUri.replace(regexp, this.mapUriParams(this.params));
        return uri.endsWith("/") ? uri.slice(0, -1) : uri;
    }
    mapUriParams(params) {
        return (_entity, isMandaratory, paramName) => {
            if (params[paramName] != null) {
                const t_param = params[paramName];
                delete this.params[paramName];
                return t_param;
            }
            else {
                if (isMandaratory === "!") {
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