import { LokalisePkg } from "../lokalise/pkg.js";
export class AuthRequest {
    static urlRoot = "https://app.lokalise.com/oauth2/";
    static async createPromise(uri, method, body, clientData) {
        const prefixUrl = clientData.host ?? this.urlRoot;
        if (clientData.version)
            uri = `/${clientData.version}/${uri}`;
        const options = {
            method: method,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const target = new URL(uri, prefixUrl);
        try {
            const response = await fetch(target, options);
            const responseJSON = response.body ? await response.json() : null;
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
            return Promise.reject({ message: err.message });
        }
    }
}
//# sourceMappingURL=auth_request.js.map