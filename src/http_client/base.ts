import { Response, Options } from "got";
const got = require("got");
const pkg = require("../../package.json");
import { Keyable } from "../interfaces/keyable";
import { ClientData } from "../interfaces/client_data";

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
    const options: Options = {
      method: method,
      prefixUrl: clientData.host ?? this.urlRoot,
      headers: {
        "User-Agent": `node-lokalise-api/${pkg.version}`,
      },
      agent: false,
      throwHttpErrors: false,
      decompress: false,
    };

    /* istanbul ignore next */
    if (!options["headers"]) {
      /* istanbul ignore next */
      options["headers"] = {};
    }

    options["headers"][
      clientData.authHeader
    ] = `${clientData.tokenType} ${clientData.token}`;

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
      const response: Response = await got(url, options);
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
    const regexp: RegExp = /{(!{0,1}):(\w*)}/g;
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
