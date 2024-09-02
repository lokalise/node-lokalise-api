import { LokaliseApiOta, describe, expect, it } from "../setup.js";

describe("LokaliseApiOta", () => {
	const token = "fake";

	it("is expected to throw an error if the API key is not provided", () => {
		expect(() => {
			new LokaliseApiOta({ apiKey: "" });
		}).to.throw(Error);
	});

	it("is expected to contain clientData", () => {
		const client = new LokaliseApiOta({ apiKey: token });
		expect(client.clientData.token).to.eq(token);
		expect(client.clientData.tokenType).to.eq("Bearer");
		expect(client.clientData.authHeader).to.eq("Authorization");
		expect(client.clientData.enableCompression).to.be.false;
		expect(client.clientData.host).to.eq("https://ota.lokalise.com");
		expect(client.clientData.version).to.eq("v3");
	});

	it("allows to customize tokenType", () => {
		const client = new LokaliseApiOta({
			apiKey: token,
			tokenType: "Custom",
		});
		expect(client.clientData.tokenType).to.eq("Custom");
	});
});
