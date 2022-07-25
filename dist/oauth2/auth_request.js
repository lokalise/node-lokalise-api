import got, { Options } from "got";
import { readFile } from "fs/promises";
const pkg = JSON.parse((await readFile("../../package.json")).toString());
export class AuthRequest {
    static urlRoot = "https://app.lokalise.com/oauth2/";
    static async createPromise(uri, method, body) {
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
        options.body = JSON.stringify(body);
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
//# sourceMappingURL=auth_request.js.map