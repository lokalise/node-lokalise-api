import { describe, expect, it, LokaliseOtaBundles } from "../setup.js";

describe("LokaliseOtaBundles", () => {
	const token = "fake";

	it("is expected to throw an error if the API key is not provided", () => {
		expect(() => {
			new LokaliseOtaBundles({ apiKey: "" });
		}).to.throw(Error);
	});

	it("is expected to contain clientData", () => {
		const client = new LokaliseOtaBundles({ apiKey: token });

		expect(client.clientData.token).to.eq(token);
		expect(client.clientData.tokenType).to.eq("");
		expect(client.clientData.authHeader).to.eq("x-ota-api-token");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.host).to.eq("https://ota.lokalise.com");
		expect(client.clientData.version).to.eq("v3");
	});
});
