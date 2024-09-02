import { LokalisePkg } from "../lokalise/pkg.js";
export class AuthRequest {
	static async createPromise(uri, method, body, clientData) {
		const prefixUrl = clientData.host;
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
		} catch (err) {
			return Promise.reject({ message: err.message });
		}
	}
}
//# sourceMappingURL=auth_request.js.map
