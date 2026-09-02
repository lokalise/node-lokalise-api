import { getCollectionItem } from "../helpers/collection.js";
import { getTestApiKey } from "../helpers/get_env.js";
import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApi", () => {
	it("is expected to throw an error if the API key is not provided", () => {
		expect(() => {
			new LokaliseApi({ apiKey: "" });
		}).toThrow(
			"Instantiation failed: A non-empty API key or JWT must be provided.",
		);
	});

	it("is expected to contain clientData", () => {
		const apiKey = getTestApiKey();
		const client = new LokaliseApi({ apiKey: apiKey });
		expect(client.clientData.token).to.eq(apiKey);
		expect(client.clientData.authHeader).to.eq("x-api-token");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.silent).to.be.false;
		expect(client.clientData.version).to.eq("api2");
	});

	it("is expected to contain custom header", () => {
		const apiKey = getTestApiKey();

		const client = new LokaliseApi({
			apiKey: apiKey,
			header: "Authorization",
		});
		expect(client.clientData.token).to.eq(apiKey);
		expect(client.clientData.authHeader).to.eq("Authorization");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.version).to.eq("api2");
	});

	it("is expected to contain custom user-agent", () => {
		const apiKey = getTestApiKey();

		const client = new LokaliseApi({
			apiKey: apiKey,
			userAgent: "CustomUserAgent/1.0",
		});
		expect(client.clientData.token).to.eq(apiKey);
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.version).to.eq("api2");
		expect(client.clientData.userAgent).to.eq("CustomUserAgent/1.0");
	});
});

describe("LokaliseApi host", () => {
	it("is expected to have empty host by default", () => {
		const client = new LokaliseApi({ apiKey: getTestApiKey() });
		expect(client.clientData.host).to.be.undefined;
	});

	it("is expected to assign host", () => {
		const client = new LokaliseApi({
			apiKey: getTestApiKey(),
			host: "http://example.com",
		});
		expect(client.clientData.host).to.eq("http://example.com");
	});
});

describe("LokaliseApi timeouts", () => {
	it("raises error on timeout", async () => {
		const stub = new Stub({
			fixture: "lokalise/contributors.json",
			query: { limit: 2 },
			uri: `projects/${project_id}/contributors`,
			delay: 50,
			respHeaders: {
				"x-pagination-total-count": "1",
				"x-pagination-page": "1",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const client = new LokaliseApi({
			apiKey: getTestApiKey(),
			requestTimeout: 1,
		});

		await expect(
			client.contributors().list({ project_id: project_id, limit: 2 }),
		).rejects.toMatchObject({
			message: "Request timed out after 1ms",
			code: 408,
			details: { reason: "timeout" },
		});
	});

	it.each([-1, 1.5, NaN, Infinity])(
		"rejects invalid request timeout: %s",
		async (requestTimeout) => {
			const client = new LokaliseApi({
				apiKey: getTestApiKey(),
				requestTimeout,
			});

			await expect(
				client.contributors().list({
					project_id,
					limit: 2,
				}),
			).rejects.toMatchObject({
				message: "requestTimeout must be a non-negative integer",
				code: 500,
			});
		},
	);
});

describe("LokaliseApi gzip", () => {
	it("decompresses", async () => {
		const stub = new Stub({
			fixture: "lokalise/contributors.json",
			query: { limit: 2 },
			uri: `projects/${project_id}/contributors`,
			reqHeaders: {
				"Accept-Encoding": "gzip,deflate",
			},
			respHeaders: {
				"x-pagination-total-count": "1",
				"x-pagination-page": "1",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const client = new LokaliseApi({
			apiKey: getTestApiKey(),
			enableCompression: true,
		});

		const contributors = await client
			.contributors()
			.list({ project_id: project_id, limit: 2 });

		expect(getCollectionItem(contributors).fullname).to.eq("Ilya B");
	});
});
