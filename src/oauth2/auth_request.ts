import got, { Options, PlainResponse } from "got";
import { readFile } from "fs/promises";
const pkg = JSON.parse((await readFile("../../package.json")).toString());
import { Keyable } from "../interfaces/keyable.js";

export class AuthRequest {
  static readonly urlRoot: NonNullable<Options["prefixUrl"]> =
    "https://app.lokalise.com/oauth2/";

  static async createPromise(
    uri: string,
    method: Options["method"],
    body: Keyable | Keyable[] | null
  ): Promise<any> {
    const options = new Options({
      method: method,
      prefixUrl: this.urlRoot,
      headers: {
        Accept: "application/json",
        "User-Agent": `node-lokalise-api/${<string>pkg.version}`,
      },
      throwHttpErrors: false,
      decompress: false,
      responseType: "text",
    });

    options.body = JSON.stringify(body);

    try {
      const response = <PlainResponse>await got(uri, options);
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
