import { Response, Options } from "got";
const got = require("got");
const pkg = require("../../package.json");

export class AuthRequest {
  static urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://app.lokalise.com/oauth2/";

  static async createPromise(
    uri: string,
    method: Options["method"],
    body: object | object[] | null
  ): Promise<any> {
    const options: Options = {
      method: method,
      prefixUrl: this.urlRoot,
      headers: {
        Accept: "application/json",
        "User-Agent": `node-lokalise-api/${pkg.version}`,
      },
      agent: false,
      throwHttpErrors: false,
      decompress: false,
    };

    options["body"] = JSON.stringify(body);

    try {
      const response: Response = await got(uri, options);
      const responseJSON = JSON.parse(<string>response.body);
      if (response.statusCode > 399) {
        return Promise.reject({
          ...{ code: response.statusCode },
          ...responseJSON,
        });
      }
      return Promise.resolve({ json: responseJSON, headers: response.headers });
    } catch (err) {
      /* istanbul ignore next */
      return Promise.reject(err);
    }
  }
}
