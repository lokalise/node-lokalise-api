import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";
const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApi", () => {
	it("is expected to throw an error if the API key is not provided", () => {
		expect(() => {
			new LokaliseApi({ apiKey: "" });
		}).toThrow("Instantiation failed: A non-empty API key or JWT must be provided.");
	});

	it("is expected to contain clientData", () => {
		const client = new LokaliseApi({ apiKey: process.env.API_KEY });
		expect(client.clientData.token).to.eq(process.env.API_KEY);
		expect(client.clientData.authHeader).to.eq("x-api-token");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.version).to.eq("api2");
	});

	it("is expected to contain custom header", () => {
		const client = new LokaliseApi({ apiKey: process.env.API_KEY, header:"Authorization" });
		expect(client.clientData.token).to.eq(process.env.API_KEY);
		expect(client.clientData.authHeader).to.eq("Authorization");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.version).to.eq("api2");
	});
});

describe("LokaliseApi host", () => {
	it("is expected to have empty host by default", () => {
		const client = new LokaliseApi({ apiKey: process.env.API_KEY });
		expect(client.clientData.host).to.be.undefined;
	});

	it("is expected to assign host", () => {
		const client = new LokaliseApi({
			apiKey: process.env.API_KEY,
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
			apiKey: process.env.API_KEY,
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
			apiKey: process.env.API_KEY,
			enableCompression: true,
		});

		const contributors = await client
			.contributors()
			.list({ project_id: project_id, limit: 2 });

		expect(contributors.items[0].fullname).to.eq("Ilya B");
	});
});
