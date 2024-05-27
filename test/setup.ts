import * as dotenv from "dotenv";
dotenv.config();
import { MockAgent, setGlobalDispatcher } from "undici";
import type {
  MockInterceptor,
  Interceptable,
} from "undici/types/mock-interceptor.js";
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
import { expect, it, describe } from "vitest";
import { LokalisePkg } from "../src/lokalise/pkg.js";
import type { HttpMethod } from "../src/types/http_method.js";

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
  data?: string;
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
  readonly data: string | undefined = undefined;

  constructor(params: StubParams) {
    if (params.fixture) {
      this.fixturePath = `./fixtures/${params.fixture}`;
    }
    this.uriPath = params.uri;
    this.requestHeaders = params.reqHeaders;
    this.responseHeaders = params.respHeaders;

    if (params.query) {
      const search = new URLSearchParams(params.query);
      this.uriPath = `${this.uriPath}?${search.toString()}`;
    }

    this.requestBody = params.body ? JSON.stringify(params.body) : undefined;
    this.data = params.data;

    const defaultParams = {
      status: 200,
      method: <HttpMethod>"GET",
      rootUrl: "https://api.lokalise.com",
      skipApiToken: false,
      version: "api2",
      doFail: false,
    };

    const { status, method, rootUrl, skipApiToken, version, doFail } = {
      ...defaultParams,
      ...params,
    };
    this.statusCode = status;
    this.httpMethod = method;
    this.rootUrl = rootUrl;
    this.skipApiToken = skipApiToken;
    this.version = version;
    this.doFail = doFail;
  }

  async setStub() {
    const mockPool = mockAgent.get(this.rootUrl);

    const mockOpts: MockInterceptor.Options = {
      method: this.httpMethod,
      path: `/${this.version}/${this.uriPath}`,
    };

    const requestHeaders = {
      Accept: "application/json",
      "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
      ...(this.skipApiToken
        ? {}
        : { "x-api-token": String(process.env.API_KEY) }),
      ...(this.requestBody ? { "Content-type": "application/json" } : {}),
      ...this.requestHeaders,
    };

    mockOpts.headers = requestHeaders;

    const respOpts: MockInterceptor.MockResponseOptions = {};

    if (this.responseHeaders) {
      respOpts.headers = this.responseHeaders;
    }

    const respond = async (
      mockPool: Interceptable,
      mockOpts: MockInterceptor.Options,
      isError: boolean,
      respOpts: MockInterceptor.MockResponseOptions,
    ) => {
      if (isError) {
        mockPool.intercept(mockOpts).replyWithError(new Error("Fail"));
      } else {
        mockPool
          .intercept(mockOpts)
          .reply(
            this.statusCode,
            this.data ?? (await this.readFixture()),
            respOpts,
          );
      }
    };

    try {
      await respond(mockPool, mockOpts, this.doFail, respOpts);
    } catch (error) {
      console.error("Error setting up test mock:", error);
    }
  }

  private async readFixture(): Promise<string> {
    if (this.fixturePath === "") return "";

    return JSON.parse(
      (await readFile(new URL(this.fixturePath, import.meta.url))).toString(),
    );
  }
}

export {
  LokaliseApi,
  Stub,
  expect,
  it,
  describe,
  LokaliseAuth,
  LokaliseApiOAuth,
  LokaliseApiOta,
  LokaliseOtaBundles,
};
