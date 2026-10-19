import { ExportVantage as Export } from "../../../src/models/vantage/export.js";
import { ExportDownloadUrlVantage } from "../../../src/models/vantage/export_download_url.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Exports", () => {
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const french_language_id = "019d29d9-de52-7ba2-87c6-b5355efd2aa7";
	const uri = `projects/${project_id}/exports`;

	it("lists exports", async () => {
		const stub = new Stub({
			fixture: "vantage/exports/list.json",
			uri: `projects/${project_id}/exports`,
			version: "vantage/v1",
			query: { limit: 10 },
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().list({
			project_id,
			limit: 10,
		});

		expect(result.count).toBe(2);
		expect(result.cursor).toBe("01a14ff9-0232-48da-7ab0-2144dc32fd5d");
		expect(result.hasMore).toBe(false);
		expect(result.items).toHaveLength(2);

		const first = result.items[0];
		const second = result.items[1];

		expect(first).toBeInstanceOf(Export);
		expect(first?.exportId).toBe("01a14ff9-030a-f316-f1bd-4cd68da08cd5");
		expect(first?.status).toBe("COMPLETED");
		expect(first?.createdAt).toBe("2026-10-18T17:04:41.740Z");
		expect(first?.totalItemsCount).toBe(2);
		expect(first?.processedItemsCount).toBe(2);
		expect(first?.failReason).toBeUndefined();

		expect(second).toBeInstanceOf(Export);
		expect(second?.exportId).toBe("01a14ff9-0232-48da-7ab0-2144dc32fd5d");
		expect(second?.status).toBe("COMPLETED");
	});

	it("lists exports filtered by IDs", async () => {
		const exportIds = [
			"01a14ff9-0232-48da-7ab0-2144dc32fd5d",
			"01a14ff9-030a-f316-f1bd-4cd68da08cd5",
		];

		const stub = new Stub({
			fixture: "vantage/exports/list.json",
			uri: `projects/${project_id}/exports`,
			version: "vantage/v1",
			query: { "filter-ids": exportIds },
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().list({
			project_id,
			"filter-ids": exportIds,
		});

		expect(result.count).toBe(2);
		expect(result.items).toHaveLength(2);
		expect(result.items[0]).toBeInstanceOf(Export);
		expect(result.items[1]).toBeInstanceOf(Export);

		expect(result.items.map((item) => item.exportId).sort()).toEqual([...exportIds].sort());
	});

	it("lists completed exports", async () => {
		const stub = new Stub({
			fixture: "vantage/exports/list.json",
			uri: `projects/${project_id}/exports`,
			version: "vantage/v1",
			query: { "filter-status": "COMPLETED" },
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().list({
			project_id,
			"filter-status": "COMPLETED",
		});

		expect(result.count).toBe(2);
		expect(result.hasMore).toBe(false);
		expect(result.items).toHaveLength(2);

		for (const item of result.items) {
			expect(item).toBeInstanceOf(Export);
			expect(item.status).toBe("COMPLETED");
			expect(item.totalItemsCount).toBe(2);
			expect(item.processedItemsCount).toBe(2);
			expect(item.failReason).toBeUndefined();
		}
	});

	it("lists exports when no results exist", async () => {
		const stub = new Stub({
			fixture: "vantage/exports/list_empty.json",
			uri: `projects/${project_id}/exports`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().list({
			project_id,
		});

		expect(result.count).toBe(0);
		expect(result.cursor).toBeNull();
		expect(result.hasMore).toBe(false);
		expect(result.items).toEqual([]);
	});

	it("gets an export", async () => {
		const export_id = "01a14ff9-030a-f316-f1bd-4cd68da08cd5";

		const stub = new Stub({
			fixture: "vantage/exports/get.json",
			uri: `projects/${project_id}/exports/${export_id}`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().get({
			project_id,
			export_id,
		});

		expect(result).toBeInstanceOf(Export);
		expect(result.exportId).toBe(export_id);
		expect(result.status).toBe("COMPLETED");
		expect(result.createdAt).toBe("2026-10-18T17:04:41.740Z");
		expect(result.totalItemsCount).toBe(2);
		expect(result.processedItemsCount).toBe(2);
		expect(result.failReason).toBeUndefined();
	});

	it("creates an export by locale", async () => {
		const stub = new Stub({
			fixture: "vantage/exports/create_locale.json",
			uri,
			version: "vantage/v1",
			method: "POST",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().create({ project_id }, { locales: ["fr"] });

		expect(result).toBeInstanceOf(Export);
		expect(result.exportId).toBe("01a14ff9-0232-48da-7ab0-2144dc32fd5d");
		expect(result.status).toBe("IN_PROGRESS");
	});

	it("creates an export by language ID", async () => {
		const stub = new Stub({
			fixture: "vantage/exports/create_language_id.json",
			uri,
			version: "vantage/v1",
			method: "POST",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi
			.exports()
			.create({ project_id }, { languageIds: [french_language_id] });

		expect(result).toBeInstanceOf(Export);
		expect(result.exportId).toBe("01a14ff9-030a-f316-f1bd-4cd68da08cd5");
		expect(result.status).toBe("IN_PROGRESS");
	});

	it("gets an export download URL", async () => {
		const export_id = "01a14ff9-030a-f316-f1bd-4cd68da08cd5";

		const stub = new Stub({
			fixture: "vantage/exports/download_url.json",
			uri: `projects/${project_id}/exports/${export_id}/download-url`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi.exports().getDownloadUrl({
			project_id,
			export_id,
		});

		expect(result).toBeInstanceOf(ExportDownloadUrlVantage);
		expect(result.downloadUrl).toBe("https://example.com/export.zip");
	});
});
