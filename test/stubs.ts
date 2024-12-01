import { readFile } from "node:fs/promises";
import { MockAgent, setGlobalDispatcher } from "undici";
import type { IncomingHttpHeaders } from "undici/types/header.js";
import type {
	Interceptable,
	MockInterceptor,
} from "undici/types/mock-interceptor.js";
import type { Keyable } from "../src/interfaces/keyable.js";
import { LokalisePkg } from "../src/lokalise/pkg.js";
import type { HttpMethod } from "../src/types/http_method.js";

const packageVersion = await LokalisePkg.getVersion();

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

type StubParams = Partial<{
	uri: string;
	fixture: string;
	method: HttpMethod;
	query: Keyable;
	body: Keyable;
	reqHeaders: Keyable;
	respHeaders: IncomingHttpHeaders;
	status: number;
	doFail: boolean;
	rootUrl: string;
	skipApiToken: boolean;
	version: string;
	data: string;
}>;

export class Stub {
	private readonly uriPath: string;
	private readonly fixturePath: string;
	private readonly httpMethod: HttpMethod;
	private readonly requestHeaders: Keyable | undefined;
	private readonly requestBody: string | undefined;
	private readonly responseHeaders: IncomingHttpHeaders | undefined;
	private readonly statusCode: number;
	private readonly doFail: boolean;
	private readonly rootUrl: string;
	private readonly version: string;
	private readonly data: string | undefined;

	constructor(params: StubParams) {
		if (!params.uri) {
			throw new Error("The 'uri' parameter is required.");
		}

		const {
			uri,
			fixture,
			method = "GET",
			query,
			body,
			reqHeaders,
			respHeaders,
			status = 200,
			doFail = false,
			rootUrl = "https://api.lokalise.com",
			skipApiToken = false,
			version = "api2",
			data,
		} = params;

		this.uriPath = this.buildUriPath(uri, query);
		this.fixturePath = fixture ? `./fixtures/${fixture}` : "";
		this.httpMethod = method;
		this.requestHeaders = this.buildRequestHeaders(
			skipApiToken,
			body,
			reqHeaders,
		);
		this.responseHeaders = respHeaders;
		this.requestBody = body ? JSON.stringify(body) : undefined;
		this.statusCode = status;
		this.doFail = doFail;
		this.rootUrl = rootUrl;
		this.version = version;
		this.data = data;
	}

	async setStub() {
		const mockPool = mockAgent.get(this.rootUrl);

		try {
			await this.setupMock(mockPool);
		} catch (error) {
			throw new Error(
				`Failed to set up mock for URI: ${this.uriPath} - ${error.message}`,
			);
		}
	}

	private async setupMock(mockPool: Interceptable) {
		const mockOpts = this.buildMockOptions();
		const respOpts = this.buildResponseOptions();

		await this.respond(mockPool, mockOpts, this.doFail, respOpts);
	}

	private async respond(
		mockPool: Interceptable,
		mockOpts: MockInterceptor.Options,
		isError: boolean,
		respOpts: MockInterceptor.MockResponseOptions,
	) {
		if (isError) {
			mockPool.intercept(mockOpts).replyWithError(new Error("Fail"));
		} else {
			const responseData = this.data ?? (await this.readFixture());
			mockPool
				.intercept({ ...mockOpts, body: this.requestBody })
				.reply(this.statusCode, responseData, respOpts);
		}
	}

	private async readFixture(): Promise<Record<string, any> | string> {
		if (!this.fixturePath) {
			return "";
		}

		try {
			const fileContent = await readFile(
				new URL(this.fixturePath, import.meta.url),
			);
			return JSON.parse(fileContent.toString());
		} catch (error) {
			console.error(
				`Error reading fixture file at ${this.fixturePath}:`,
				error,
			);
			throw error;
		}
	}

	private buildRequestHeaders(
		skipApiToken: boolean,
		body: Keyable | undefined,
		reqHeaders?: Keyable,
	): Keyable {
		return {
			Accept: "application/json",
			"User-Agent": `node-lokalise-api/${packageVersion}`,
			...(skipApiToken ? {} : { "x-api-token": String(process.env.API_KEY) }),
			...(body ? { "Content-type": "application/json" } : {}),
			...reqHeaders,
		};
	}

	private buildUriPath(uri: string, query?: Keyable): string {
		return query ? `${uri}?${new URLSearchParams(query).toString()}` : uri;
	}

	private buildMockOptions(): MockInterceptor.Options {
		return {
			method: this.httpMethod,
			path: `/${this.version}/${this.uriPath}`,
			headers: this.requestHeaders,
		};
	}

	private buildResponseOptions(): MockInterceptor.MockResponseOptions {
		return {
			headers: this.responseHeaders,
		};
	}
}
