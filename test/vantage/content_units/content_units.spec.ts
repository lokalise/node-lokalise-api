import { ContentUnitVantage as ContentUnit } from "../../../src/models/vantage/content_unit.js";
import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Content units", () => {
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const item_id = "019d29da-3f21-dad8-0084-175d6fea47d2";
	const uri = `projects/${project_id}/items/${item_id}/content-units`;
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/content_units/list.json",
			uri,
			version: "vantage/v1",
		});

		await stub.setStub();

		const contentUnits = await lokaliseVantageApi.contentUnits().list({ project_id, item_id });

		expect(contentUnits.items.length).toBe(4);
		expect(contentUnits.count).toBe(4);
		expect(contentUnits.hasMore).toBe(false);
		expect(contentUnits.cursor).toBe("019d29da-3fee-8fad-b137-bb110afc5af1");

		const contentUnit = getCollectionItem(contentUnits, 0);
		expect(contentUnit).toBeInstanceOf(ContentUnit);
		expect(contentUnit.id).toBe("019d29da-3fed-d8d1-0c06-3eb85c80d6f9");
		expect(contentUnit.projectId).toBe(project_id);
		expect(contentUnit.type).toBe("TEXT");
		expect(contentUnit.key).toBe("tu1");
		expect(contentUnit.position).toBe(1);
		expect(contentUnit.sourceSegmentsCount).toBe(1);
	});

	it("lists with params", async () => {
		const query = { "filter-keys": ["tu1"] };
		const stub = new Stub({
			fixture: "vantage/content_units/list_params.json",
			uri,
			version: "vantage/v1",
			query,
		});

		await stub.setStub();

		const contentUnits = await lokaliseVantageApi
			.contentUnits()
			.list({ project_id, item_id, ...query });

		expect(contentUnits.items.length).toBe(1);
		expect(contentUnits.count).toBe(1);
		expect(contentUnits.hasMore).toBe(false);

		const contentUnit = getCollectionItem(contentUnits, 0);
		expect(contentUnit).toBeInstanceOf(ContentUnit);
		expect(contentUnit.projectId).toBe(project_id);
		expect(contentUnit.key).toBe("tu1");
	});

	it("lists with cursor pagination", async () => {
		const firstQuery = { limit: 2 };
		const firstStub = new Stub({
			fixture: "vantage/content_units/page_1.json",
			uri,
			version: "vantage/v1",
			query: firstQuery,
		});

		await firstStub.setStub();

		const firstPage = await lokaliseVantageApi
			.contentUnits()
			.list({ project_id, item_id, ...firstQuery });

		expect(firstPage.items.length).toBe(2);
		expect(firstPage.count).toBe(2);
		expect(firstPage.hasMore).toBe(true);
		expect(firstPage.cursor).toBe("019d29da-3fee-8fad-b137-bb110afc5aee");

		if (!firstPage.cursor) {
			throw new Error("Expected pagination cursor");
		}

		const secondQuery = { after: firstPage.cursor, limit: 2 };
		const secondStub = new Stub({
			fixture: "vantage/content_units/page_2.json",
			uri,
			version: "vantage/v1",
			query: secondQuery,
		});

		await secondStub.setStub();

		const secondPage = await lokaliseVantageApi
			.contentUnits()
			.list({ project_id, item_id, ...secondQuery });

		expect(secondPage.items.length).toBe(2);
		expect(secondPage.count).toBe(2);
		expect(secondPage.hasMore).toBe(false);
		expect(secondPage.cursor).toBe("019d29da-3fee-8fad-b137-bb110afc5af1");

		const firstPageIds = firstPage.items.map((unit) => unit.id);
		const secondPageIds = secondPage.items.map((unit) => unit.id);

		expect(secondPageIds).not.toEqual(firstPageIds);
		for (const id of secondPageIds) {
			expect(firstPageIds).not.toContain(id);
		}

		expect(getCollectionItem(secondPage, 0)).toBeInstanceOf(ContentUnit);
	});
});
