import { LokalisePkg } from "../lokalise/pkg.js";
export class AuthRequest {
    static async createPromise(uri, method, body, { host, version }) {
        const fullUri = `/${version}/${uri}`;
        const target = new URL(fullUri, host);
        const options = {
            method: method,
            headers: await AuthRequest.buildHeaders(),
            body: JSON.stringify(body),
        };
        return AuthRequest.fetchAndHandleResponse(target, options);
    }
    static async fetchAndHandleResponse(target, options) {
        try {
            const response = await fetch(target, options);
            const responseJSON = await response.json();
            if (response.ok) {
                return Promise.resolve({
                    json: responseJSON,
                    headers: response.headers,
                });
            }
            return Promise.reject({
                ...{ code: response.status },
                ...responseJSON,
            });
        }
        catch (err) {
            return Promise.reject({
                message: err.message,
            });
        }
    }
    static async buildHeaders() {
        const headers = new Headers({
            Accept: "application/json",
            "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
            "Content-type": "application/json",
        });
        return headers;
    }
}
//# sourceMappingURL=auth_request.js.map