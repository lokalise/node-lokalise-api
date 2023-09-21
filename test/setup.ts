import * as dotenv from "dotenv";
dotenv.config();
import { MockAgent, setGlobalDispatcher } from "undici";
import type { MockInterceptor } from "undici/types/mock-interceptor.js";
import type { IncomingHttpHeaders } from "undici/types/header.js";
import {
  LokaliseApi,
  LokaliseAuth,
  LokaliseApiOAuth,
  LokaliseApiOta,
  LokaliseOtaBundles,
} from "../src/main.js";
import { readFile } from "fs/promises";
import { Keyable } from "../src/interfaces/keyable.js";
import { expect } from "chai";
import { LokalisePkg } from "../src/lokalise/pkg.js";
import { HttpMethod } from "../src/types/http_method.js";

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

type StubParams = {
  uri: string;
  fixture?: string;
  method?: HttpMethod;
  query?: Keyable;
  body?: Keyable;
  reqHeaders?: Keyable;
  respHeaders?: IncomingHttpHeaders;
  status?: number;
  doFail?: boolean;
  rootUrl?: string;
  skipApiToken?: boolean;
  version?: string;
};

class Stub {
  readonly uriPath: string;
  readonly fixturePath: string = "";
  readonly httpMethod: HttpMethod;
  readonly requestHeaders: Keyable | undefined = undefined;
  readonly requestBody: string | undefined = undefined;
  readonly responseHeaders: IncomingHttpHeaders | undefined = undefined;
  readonly statusCode: number;
  readonly doFail: boolean;
  readonly rootUrl: string;
  readonly skipApiToken: boolean;
  readonly version: string;

  constructor(params: StubParams) {
    if (params.fixture) {
      this.fixturePath = `./fixtures/${params.fixture}`;
    }
    this.uriPath = params.uri;
    this.requestHeaders = params.reqHeaders;
    this.responseHeaders = params.respHeaders;
    this.statusCode = params.status ?? 200;
    this.httpMethod = params.method ?? "GET";
    if (params.query) {
      const search = new URLSearchParams(params.query);
      this.uriPath = `${this.uriPath}?${search.toString()}`;
    }
    this.requestBody = params.body ? JSON.stringify(params.body) : undefined;
    this.doFail = params.doFail ?? false;
    this.rootUrl = params.rootUrl ?? "https://api.lokalise.com";
    this.skipApiToken = params.skipApiToken ?? false;
    this.version = params.version ?? "api2";
  }

  async setStub() {
    const mockPool = mockAgent.get(this.rootUrl);

    const mockOpts: MockInterceptor.Options = {
      method: this.httpMethod,
      path: `/${this.version}/${this.uriPath}`,
    };

    let requestHeaders = {
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
    };

    if (!this.skipApiToken) {
      requestHeaders = {
        ...requestHeaders,
        ...{ "x-api-token": <string>process.env.API_KEY },
      };
    }

    if (this.requestHeaders) {
      requestHeaders = {
        ...requestHeaders,
        ...this.requestHeaders,
      };
    }

    if (this.requestBody) {
      mockOpts.body = this.requestBody;
      requestHeaders = {
        ...requestHeaders,
        ...{ "Content-type": "application/json" },
      };
    }

    mockOpts.headers = requestHeaders;

    const respOpts: MockInterceptor.MockResponseOptions = {};

    if (this.responseHeaders) {
      respOpts.headers = this.responseHeaders;
    }

    if (this.doFail) {
      mockPool.intercept(mockOpts).replyWithError(new Error("Fail"));
    } else {
      const data = await this.readFixture();
      mockPool.intercept(mockOpts).reply(this.statusCode, data, respOpts);
    }
  }

  private async readFixture(): Promise<string> {
    return JSON.parse(
      (await readFile(new URL(this.fixturePath, import.meta.url))).toString(),
    );
  }
}

export {
  LokaliseApi,
  Stub,
  expect,
  LokaliseAuth,
  LokaliseApiOAuth,
  LokaliseApiOta,
  LokaliseOtaBundles,
};
