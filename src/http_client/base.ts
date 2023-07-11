import got, { PlainResponse, Options } from "got";
import { Keyable, WritableKeyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";
import { LokalisePkg } from "../lokalise/pkg.js";

export class ApiRequest {
  public promise: Promise<any>;
  public params: WritableKeyable = {};
  private readonly urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://api.lokalise.com/api2/";

  constructor(
    uri: string,
    method: Options["method"],
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
    method: Options["method"],
    body: object | object[] | null,
    clientData: ClientData,
  ): Promise<any> {
    const url = this.composeURI(uri);

    const options = new Options({
      method: method,
      prefixUrl: clientData.host ?? this.urlRoot,
      headers: {
        Accept: "application/json",
        "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
      },
      throwHttpErrors: false,
      decompress: false,
      responseType: "text",
      searchParams: new URLSearchParams(this.params),
      url: url,
    });

    options.headers[
      clientData.authHeader
    ] = `${clientData.tokenType} ${clientData.token}`;

    if (clientData.enableCompression) {
      options.headers["Accept-Encoding"] = "gzip,deflate";
      options.decompress = true;
    }

    if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = <PlainResponse>await got(undefined, undefined, options);
      const responseJSON = JSON.parse(<string>response.body);
      if (response.statusCode > 399) {
        return Promise.reject(responseJSON["error"] || responseJSON);
      }
      return Promise.resolve({ json: responseJSON, headers: response.headers });
      /* c8 ignore next 4 */
    } catch (err) {
      return Promise.reject(err);
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
          /* c8 ignore next */
          throw new Error("Required param " + paramName);
        } else {
          return "";
        }
      }
    };
  }
}
