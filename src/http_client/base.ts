import { HttpMethod } from "../types/http_method.js";
import { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
import { LokalisePkg } from "../lokalise/pkg.js";

export class ApiRequest {
  public promise: Promise<any>;
  public params: WritableKeyable = {};
  protected readonly urlRoot = "https://api.lokalise.com/api2/";

  constructor(
    uri: string,
    method: HttpMethod,
    body: object | object[] | null,
    params: Keyable,
    clientData: ClientData,
  ) {
    // Since we modify params, we need to make a copy of it so we don't modify the original
    this.params = { ...params };
    this.promise = this.createPromise(uri, method, body, clientData);
    return this;
  }

  protected async createPromise(
    uri: string,
    method: HttpMethod,
    body: object | object[] | null,
    clientData: ClientData,
  ): Promise<any> {
    if (clientData.version) uri = `/${clientData.version}/${uri}`;

    const url = this.composeURI(uri);

    const prefixUrl = clientData.host ?? this.urlRoot;

    const options: RequestInit = {
      method: method,
    };

    const headers = new Headers({
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
    });

    headers.append(
      clientData.authHeader,
      `${clientData.tokenType} ${clientData.token}`,
    );

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
      let responseJSON;
      if (response.status === 204) {
        responseJSON = null;
      } else {
        responseJSON = await response.json();
      }

      if (response.ok) {
        return Promise.resolve({
          json: responseJSON,
          headers: response.headers,
        });
      }
      return Promise.reject(this.getErrorFromResp(responseJSON));
    } catch (err) {
      return Promise.reject({ message: err.message });
    }
  }

  protected getErrorFromResp(respJson: any): any {
    if (typeof respJson["error"] === "object") {
      return respJson["error"];
    } else {
      return respJson;
    }
  }

  protected composeURI(rawUri: string): string {
    const regexp = /{(!{0,1}):(\w*)}/g;
    const uri = rawUri.replace(regexp, this.mapUriParams());
    return uri.endsWith("/") ? uri.slice(0, -1) : uri;
  }

  protected mapUriParams() {
    return (_entity: any, isMandaratory: string, paramName: string): string => {
      if (this.params[paramName] != null) {
        const t_param = this.params[paramName];

        // We delete the param so we don't send it as a query param as well.
        delete this.params[paramName];

        return t_param;
      } else {
        if (isMandaratory === "!") {
          throw new Error("Missing required param: " + paramName);
        } else {
          return "";
        }
      }
    };
  }
}
