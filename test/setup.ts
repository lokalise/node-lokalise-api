import * as dotenv from "dotenv";
dotenv.config();
import { readFile } from "node:fs/promises";
import { MockAgent, setGlobalDispatcher } from "undici";
import type { IncomingHttpHeaders } from "undici/types/header.js";
import type {
	Interceptable,
	MockInterceptor,
} from "undici/types/mock-interceptor.js";
import { describe, expect, it } from "vitest";
import type { Keyable } from "../src/interfaces/keyable.js";
import { LokalisePkg } from "../src/lokalise/pkg.js";
import {
	LokaliseApi,
	LokaliseApiOAuth,
	LokaliseApiOta,
	LokaliseAuth,
	LokaliseOtaBundles,
} from "../src/main.js";
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

	constructor({
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
	}: StubParams) {
		this.uriPath = query
			? `${uri}?${new URLSearchParams(query).toString()}`
			: uri;
		this.fixturePath = fixture ? `./fixtures/${fixture}` : "";
		this.httpMethod = method;
		this.requestBody = body ? JSON.stringify(body) : undefined;
		this.requestHeaders = reqHeaders;
		this.responseHeaders = respHeaders;
		this.statusCode = status;
		this.doFail = doFail;
		this.rootUrl = rootUrl;
		this.skipApiToken = skipApiToken;
		this.version = version;
		this.data = data;
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

		try {
			await this.respond(mockPool, mockOpts, this.doFail, respOpts);
		} catch (error) {
			console.error("Error setting up test mock:", error);
		}
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
			mockPool
				.intercept(mockOpts)
				.reply(
					this.statusCode,
					this.data ?? (await this.readFixture()),
					respOpts,
				);
		}
	}

	private async readFixture(): Promise<string> {
		if (this.fixturePath === "") {
			return "";
		}

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
