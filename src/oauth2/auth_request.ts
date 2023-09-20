import { LokalisePkg } from "../lokalise/pkg.js";
import { HttpMethod } from "../types/http_method.js";
import { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";

export class AuthRequest {
  static readonly urlRoot = "https://app.lokalise.com/oauth2/";

  static async createPromise(
    uri: string,
    method: HttpMethod,
    body: object | object[] | null,
    clientData: AuthDataInterface,
  ): Promise<any> {
    const prefixUrl = clientData.host ?? this.urlRoot;

    if (clientData.version) uri = `/${clientData.version}/${uri}`;

    const options: RequestInit = {
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
    } catch (err) {
      return Promise.reject({ message: err.message });
    }
  }
}
