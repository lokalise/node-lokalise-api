import { ImportVantage as Import } from "../../../src/models/vantage/import.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Imports", () => {
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const uri = `projects/${project_id}/imports`;

	it("imports an entire batch", async () => {
		const stub = new Stub({
			fixture: "vantage/imports/create_batch.json",
			uri,
			version: "vantage/v1",
			method: "POST",
			status: 202,
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.imports().create(
			{ project_id },
			{
				batchId: "019d29da-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
			},
		);

		expect(result).toBeInstanceOf(Import);
		expect(result.importId).toBe("019d29da-1111-4111-8111-111111111111");
	});

	it("imports selected uploads", async () => {
		const stub = new Stub({
			fixture: "vantage/imports/create_uploads.json",
			uri,
			version: "vantage/v1",
			method: "POST",
			status: 202,
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.imports().create(
			{ project_id },
			{
				uploads: [
					{
						uploadId: "019d29da-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
					},
					{
						uploadId: "019d29da-cccc-4ccc-8ccc-cccccccccccc",
					},
				],
			},
		);

		expect(result).toBeInstanceOf(Import);
		expect(result.importId).toBe("019d29da-2222-4222-8222-222222222222");
	});
});
