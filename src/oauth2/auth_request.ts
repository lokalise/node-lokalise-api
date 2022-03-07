import { Response, Options } from "got";
const got = require("got");
const pkg = require("../../package.json");
import { AuthData } from "../interfaces/auth_data";

export class AuthRequest {
  static urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://app.lokalise.com/oauth2/";
  promise: Promise<any>;
  params: object = {};

  constructor(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    params: object,
    clientData: AuthData
  ) {
    this.params = params;
    this.promise = this.createPromise(uri, method, body, clientData);
  }

  async createPromise(
    uri: string,
    method: Options["method"],
    body: object | object[] | null,
    authData: AuthData
  ): Promise<any> {
    console.log(authData);
    const options: Options = {
      method: method,
      prefixUrl: AuthRequest.urlRoot,
      headers: {
        Accept: "application/json",
        "User-Agent": `node-lokalise-api/${pkg.version}`,
      },
      agent: false,
      throwHttpErrors: false,
      decompress: false,
    };

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

    try {
      const response: Response = await got(uri, options);
      const responseJSON = JSON.parse(<string>response.body);
      if (response.statusCode > 299) {
        return Promise.reject(responseJSON["error"] || responseJSON);
      }
      return Promise.resolve({ json: responseJSON, headers: response.headers });
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject(err);
    }
  }
}
