import { RequestError, Response, Options } from "got";
const got = require("got");
const pkg = require("../../package.json");
import { LokaliseApi } from "../lokalise/lokalise";

export class ApiRequest {
  private urlRoot: string | URL = "https://api.lokalise.com/api2/";
  public promise: Promise<any>;
  public params: any = {};

  /* istanbul ignore next */
  constructor(
    uri: string,
    method: string,
    body: Object | Array<Object> | null = null,
    params: Object = {}
  ) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body);
    return this;
  }

  createPromise(
    uri: string,
    method: any,
    body: Object | Array<Object> | null
  ): Promise<any> {
    const options: Options = {
      method: method,
      prefixUrl: this.urlRoot,
      headers: {
        "X-Api-Token": <string>LokaliseApi.apiKey,
        "User-Agent": `node-lokalise-api/${pkg.version}`,
      },
      agent: false,
      throwHttpErrors: false,
      decompress: false,
    };

    const url: string = this.composeURI(uri);

    if (Object.keys(this.params).length > 0) {
      options["searchParams"] = new URLSearchParams(this.params).toString();
    }

    if (method != "GET" && body) {
      options["body"] = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      got(url, options)
        .then((response: Response) => {
          const responseJSON = JSON.parse(<string>response.body);
          if (response.statusCode > 299) {
            /* istanbul ignore next */
            reject(
              responseJSON["error"] || responseJSON["errors"] || responseJSON
            );
            return;
          }
          resolve({ json: responseJSON, headers: response.headers });
          return;
        })
        .then((error: RequestError) => {
          reject(error);
          /* istanbul ignore next */
          return error;
        })
        .catch((error: any) => {
          reject(error);
          return error;
        });
    });
  }

  protected composeURI(uri: any): string {
    const regexp: RegExp = /{(!{0,1}):(\w*)}/g;
    return uri.replace(regexp, this.mapUriParams(this.params));
  }

  protected mapUriParams(params: any) {
    return (_entity: any, isMandaratory: any, paramName: any): any => {
      if (params[paramName] != null) {
        const t_param = params[paramName];
        delete this.params[paramName];
        return t_param;
      } else {
        /* istanbul ignore if */
        if (isMandaratory == "!") {
          throw new Error("Required param " + paramName);
        } else {
          return "";
        }
      }
    };
  }
}
