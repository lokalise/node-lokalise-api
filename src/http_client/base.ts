import { RequestError, Response, Options } from "got";
const got = require("got");
const pkg = require("../../package.json");
import { StandartParams } from "../interfaces/standart_params";
import { ClientData } from "../interfaces/client_data";

export class ApiRequest {
  private urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://api.lokalise.com/api2/";
  public promise: Promise<any>;
  public params: StandartParams = {};

  constructor(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    params: StandartParams,
    clientData: ClientData
  ) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body, clientData);
    return this;
  }

  createPromise(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    clientData: ClientData
  ): Promise<any> {
    const options: Options = {
      method: method,
      prefixUrl: this.urlRoot,
      headers: {
        "User-Agent": `node-lokalise-api/${pkg.version}`,
      },
      agent: false,
      throwHttpErrors: false,
      decompress: false,
    };

    // Make strictNullChecks happy
    if (!options["headers"]) {
      options["headers"] = {};
    }

    options["headers"][clientData.authHeader] = clientData.token;

    if (clientData.enableCompression) {
      options["headers"]["Accept-Encoding"] = "gzip,deflate";
      options["decompress"] = true;
    }

    const url: string = this.composeURI(uri);

    if (Object.keys(this.params).length > 0) {
      const formattedParams = new URLSearchParams();
      Object.entries(this.params).forEach(([key, value]) => {
        formattedParams.set(key, <string>value);
      });
      options["searchParams"] = formattedParams.toString();
    }

    if (method !== "GET" && body) {
      options["body"] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      got(url, options)
        .then((response: Response) => {
          const responseJSON = JSON.parse(<string>response.body);
          if (response.statusCode > 299) {
            /* istanbul ignore next */
            reject(responseJSON["error"] || responseJSON);
            return;
          }
          resolve({ json: responseJSON, headers: response.headers });
          return;
        })
        .then((error: RequestError) => {
          reject(error);
          return error;
        })
        /* istanbul ignore next */
        .catch((error: any) => {
          /* istanbul ignore next */
          reject(error);
          /* istanbul ignore next */
          return error;
        });
    });
  }

  protected composeURI(uri: string): string {
    const regexp: RegExp = /{(!{0,1}):(\w*)}/g;
    return uri.replace(regexp, this.mapUriParams(this.params));
  }

  protected mapUriParams(params: StandartParams) {
    return (_entity: any, isMandaratory: any, paramName: string): string => {
      if (params[paramName] != null) {
        const t_param = params[paramName];
        delete this.params[paramName];
        return t_param;
      } else {
        if (isMandaratory == "!") {
          throw new Error("Required param " + paramName);
        } else {
          return "";
        }
      }
    };
  }
}
