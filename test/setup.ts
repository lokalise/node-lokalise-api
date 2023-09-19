import * as dotenv from "dotenv";
dotenv.config();
import { MockAgent, setGlobalDispatcher } from "undici";
import type { MockInterceptor } from "undici/types/mock-interceptor.js";
import type { IncomingHttpHeaders } from "undici/types/header.js";
import { LokaliseApi } from "../src/lokalise/lokalise_api.js";
import { readFile } from "fs/promises";
import { Keyable } from "../src/interfaces/keyable.js";
import { expect } from "chai";

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);
//mockAgent.disableNetConnect();

type StubParams = {
  fixture: string;
  uri: string;
  reqHeaders?: Keyable;
  respHeaders?: IncomingHttpHeaders;
  status?: number;
};

class Stub {
  readonly fixturePath: string;
  readonly uriPath: string;
  readonly requestHeaders: Keyable | undefined = undefined;
  readonly responseHeaders: IncomingHttpHeaders | undefined = undefined;
  readonly statusCode: number;

  constructor(params: StubParams) {
    this.fixturePath = `./fixtures/${params.fixture}`;
    this.uriPath = params.uri;
    this.requestHeaders = params.reqHeaders;
    this.responseHeaders = params.respHeaders;
    this.statusCode = params.status ?? 200;
  }

  async setStub() {
    const data = await this.readFixture();
    const mockPool = mockAgent.get("https://api.lokalise.com");

    const mockOpts: MockInterceptor.Options = {
      path: this.uriPath,
    };

    const respOpts: MockInterceptor.MockResponseOptions = {};

    if (this.requestHeaders) {
      mockOpts.headers = this.requestHeaders;
    }

    if (this.responseHeaders) {
      respOpts.headers = this.responseHeaders;
    }

    mockPool.intercept(mockOpts).reply(this.statusCode, data, respOpts);
  }

  private async readFixture(): Promise<string> {
    return JSON.parse(
      (await readFile(new URL(this.fixturePath, import.meta.url))).toString(),
    );
  }
}

export { LokaliseApi, Stub, expect };
