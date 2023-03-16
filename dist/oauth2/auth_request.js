import got, { Options } from "got";
import { LokalisePkg } from "../lokalise/pkg.js";
class AuthRequest {
    static urlRoot = "https://app.lokalise.com/oauth2/";
    static async createPromise(uri, method, body, host) {
        const options = new Options({
            method: method,
            prefixUrl: host ?? this.urlRoot,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
            },
            throwHttpErrors: false,
            decompress: false,
            responseType: "text",
            body: JSON.stringify(body),
            url: uri,
        });
        try {
            const response = await got(undefined, undefined, options);
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
            /* c8 ignore next 2 */
            return Promise.reject(err);
        }
    }
}
export { AuthRequest };
//# sourceMappingURL=auth_request.js.map