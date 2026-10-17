import { SegmentVantage as Segment } from "../../../src/models/vantage/segment.js";
import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Segments", () => {
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const content_unit_id = "019d29da-3fee-8fad-b137-bb110afc5af0";
	const language_id = "019d29d9-de52-7ba2-87c6-b5355ebf9c72";
	const uri = `projects/${project_id}/content-units/${content_unit_id}/segments`;

	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/segments/list.json",
			uri,
			version: "vantage/v1",
		});

		await stub.setStub();

		const segments = await lokaliseVantageApi
			.segments()
			.list({ project_id, content_unit_id });

		expect(segments.items.length).toBe(6);
		expect(segments.count).toBe(6);
		expect(segments.hasMore).toBe(false);
		expect(segments.cursor).toBe("019d29da-cd10-9b67-afe8-1fd2649d53b9");

		const segment = getCollectionItem(segments, 0);
		expect(segment).toBeInstanceOf(Segment);
		expect(segment.id).toBe("019d29da-401d-31f1-7eef-1e2dc7d22298");
		expect(segment.number).toBe(0);
		expect(segment.value).toBe(
			"Alice was beginning to get very tired of sitting by her sister on the",
		);
		expect(segment.status).toBe("APPROVED");
		expect(segment.lastChangeSource).toBe("IMPORT");
		expect(segment.contentLanguageId).toBe(language_id);
		expect(segment.contentUnitId).toBe(content_unit_id);
		expect(segment.projectId).toBe(project_id);
		expect(segment.metadata).toBeNull();
		expect(segment.createdAt).toBe("2026-03-26T11:14:22.360Z");
		expect(segment.updatedAt).toBe("2026-03-26T11:14:22.360Z");

		const secondSegment = getCollectionItem(segments, 1);
		expect(secondSegment.status).toBe("PENDING_REVIEW");
		expect(secondSegment.lastChangeSource).toBe("AI");

		const thirdSegment = getCollectionItem(segments, 2);
		expect(thirdSegment.metadata).toEqual({ prefix: "\n" });

		const lastSegment = getCollectionItem(segments, 5);
		expect(lastSegment.status).toBe("APPROVED");
		expect(lastSegment.lastChangeSource).toBe("HUMAN");
	});

	it("lists with params", async () => {
		const query = {
			"filter-languages": [language_id],
		};

		const stub = new Stub({
			fixture: "vantage/segments/list_params.json",
			uri,
			version: "vantage/v1",
			query,
		});

		await stub.setStub();

		const segments = await lokaliseVantageApi
			.segments()
			.list({ project_id, content_unit_id, ...query });

		expect(segments.items.length).toBe(3);
		expect(segments.count).toBe(3);
		expect(segments.hasMore).toBe(false);
		expect(segments.cursor).toBe("019d29da-401d-31f1-7eef-1e2ec59c0a3c");

		for (const segment of segments.items) {
			expect(segment).toBeInstanceOf(Segment);
			expect(segment.projectId).toBe(project_id);
			expect(segment.contentUnitId).toBe(content_unit_id);
			expect(segment.contentLanguageId).toBe(language_id);
		}

		const firstSegment = getCollectionItem(segments, 0);
		expect(firstSegment.value).toBe(
			"Alice was beginning to get very tired of sitting by her sister on the",
		);
	});

	it("lists with cursor pagination", async () => {
		const firstQuery = { limit: 2 };
		const firstStub = new Stub({
			fixture: "vantage/segments/page_1.json",
			uri,
			version: "vantage/v1",
			query: firstQuery,
		});

		await firstStub.setStub();

		const firstPage = await lokaliseVantageApi
			.segments()
			.list({ project_id, content_unit_id, ...firstQuery });

		expect(firstPage.items.length).toBe(2);
		expect(firstPage.count).toBe(2);
		expect(firstPage.hasMore).toBe(true);
		expect(firstPage.cursor).toBe("019d29da-cd10-9b67-afe8-1fd14d0a5dee");

		if (!firstPage.cursor) {
			throw new Error("Expected pagination cursor");
		}

		const secondQuery = {
			after: firstPage.cursor,
			limit: 2,
		};

		const secondStub = new Stub({
			fixture: "vantage/segments/page_2.json",
			uri,
			version: "vantage/v1",
			query: secondQuery,
		});

		await secondStub.setStub();

		const secondPage = await lokaliseVantageApi
			.segments()
			.list({ project_id, content_unit_id, ...secondQuery });

		expect(secondPage.items.length).toBe(2);
		expect(secondPage.count).toBe(2);
		expect(secondPage.hasMore).toBe(true);
		expect(secondPage.cursor).toBe("019d29da-cd10-9b67-afe8-1fd213e7e512");

		const firstPageIds = firstPage.items.map((segment) => segment.id);
		const secondPageIds = secondPage.items.map((segment) => segment.id);

		expect(secondPageIds).not.toEqual(firstPageIds);
		for (const id of secondPageIds) {
			expect(firstPageIds).not.toContain(id);
		}

		expect(getCollectionItem(secondPage, 0)).toBeInstanceOf(Segment);
		expect(getCollectionItem(secondPage, 0).number).toBe(1);
	});
});
