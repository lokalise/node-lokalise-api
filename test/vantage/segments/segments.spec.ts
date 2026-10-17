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

	describe("Segment updates", () => {
		const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
		const segment_id = "019d29da-cd10-9b67-afe8-1fd14d0a5dee";
		const params = { project_id, segment_id };

		const lokaliseVantageApi = new LokaliseApiVantage({
			apiKey: getTestApiKey(),
		});

		async function setUpdateStub(
			fixture: string,
			body: Record<string, unknown>,
		): Promise<void> {
			const stub = new Stub({
				fixture: `vantage/segments/${fixture}`,
				uri: `projects/${project_id}/segments/${segment_id}`,
				version: "vantage/v1",
				method: "PATCH",
				body,
			});

			await stub.setStub();
		}

		it("updates a segment without warnings", async () => {
			const body = { status: "PENDING_REVIEW" as const };
			await setUpdateStub("update.json", body);

			const result = await lokaliseVantageApi.segments().update(params, body);

			expect(result.data).toBeInstanceOf(Segment);
			expect(result.data.id).toBe(segment_id);
			expect(result.data.status).toBe("PENDING_REVIEW");
			expect(result.data.lastChangeSource).toBe("AI");
			expect(result.data.contentUnitId).toBe(
				"019d29da-3fee-8fad-b137-bb110afc5af0",
			);
			expect(result).not.toHaveProperty("warnings");
		});

		it("updates a segment and returns warnings", async () => {
			const body = { value: "Bonjour le monde" };
			await setUpdateStub("update_warnings.json", body);

			const result = await lokaliseVantageApi.segments().update(params, body);

			expect(result.data).toBeInstanceOf(Segment);
			expect(result.data.value).toBe("Bonjour le monde");
			expect(result.data.lastChangeSource).toBe("HUMAN");
			expect(result.warnings).toEqual([
				{
					code: "NON_TRANSLATABLE_TAGS_MISMATCH",
					details: { expected: ["<b>"], actual: [] },
				},
				{ code: "OTHER_WARNING" },
			]);
		});

		it("accepts an empty warnings array", async () => {
			const body = { status: "APPROVED" as const };
			await setUpdateStub("update_empty_warnings.json", body);

			const result = await lokaliseVantageApi.segments().update(params, body);

			expect(result.data).toBeInstanceOf(Segment);
			expect(result.warnings).toEqual([]);
		});

		it("rejects a response when data is not an object", async () => {
			const body = { value: "invalid-data-case" };
			await setUpdateStub("update_invalid_data.json", body);

			await expect(
				lokaliseVantageApi.segments().update(params, body),
			).rejects.toThrow("Expected 'data' to be an object");
		});

		it.each([
			"update_invalid_warnings_type.json",
			"update_invalid_warning_entry.json",
			"update_invalid_warning_code.json",
			"update_invalid_warning_details.json",
		])("rejects malformed warnings in %s", async (fixture) => {
			const body = { value: fixture };
			await setUpdateStub(fixture, body);

			await expect(
				lokaliseVantageApi.segments().update(params, body),
			).rejects.toThrow(
				"Expected 'warnings' to be an array of warning objects",
			);
		});
	});
});
