import got, { PlainResponse, Options } from "got";
import { readFile } from "fs/promises";
const pkg = JSON.parse((await readFile("./package.json")).toString());
import { Keyable } from "../interfaces/keyable.js";
import { ClientData } from "../interfaces/client_data.js";

export class ApiRequest {
  private readonly urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://api.lokalise.com/api2/";
  public promise: Promise<any>;
  public params: Keyable = {};

  constructor(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    params: Keyable,
    clientData: ClientData
  ) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body, clientData);
    return this;
  }

  async createPromise(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    clientData: ClientData
  ): Promise<any> {
    const url = this.composeURI(uri);

    const options = new Options({
      method: method,
      prefixUrl: clientData.host ?? this.urlRoot,
      headers: {
        Accept: "application/json",
        "User-Agent": `node-lokalise-api/${<string>pkg.version}`,
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
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject(err);
    }
  }

  protected composeURI(rawUri: string): string {
    const regexp = /{(!{0,1}):(\w*)}/g;
    const uri = rawUri.replace(regexp, this.mapUriParams(this.params));
    return uri.endsWith("/") ? uri.slice(0, -1) : uri;
  }

  protected mapUriParams(params: Keyable) {
    return (_entity: any, isMandaratory: string, paramName: string): string => {
      if (params[paramName] != null) {
        const t_param = params[paramName];
        delete this.params[paramName];
        return t_param;
      } else {
        if (isMandaratory === "!") {
          throw new Error("Required param " + paramName);
        } else {
          return "";
        }
      }
    };
  }
}
