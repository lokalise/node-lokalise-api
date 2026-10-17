import { ContentUnitVantage } from "../../src/models/vantage/content_unit.js";
import { getTestApiKey } from "../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage } from "../setup.js";
import { DummyCollectionVantage } from "./dummy_collection_vantage.js";

describe("BaseCollectionVantage", () => {
	const lokaliseApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	const collection = new DummyCollectionVantage(lokaliseApi.clientData);

	const item = {
		id: "unit-1",
		projectId: "project-1",
		type: "TEXT",
		key: "tu1",
		position: 1,
		sourceSegmentsCount: 1,
	};

	it("populates a valid cursor-paginated response", () => {
		const result = collection.testPopulateCursor({
			data: [item],
			meta: {
				count: 1,
				cursor: "unit-1",
				hasMore: true,
			},
		});

		expect(result.items.length).toBe(1);
		expect(result.count).toBe(1);
		expect(result.cursor).toBe("unit-1");
		expect(result.hasMore).toBe(true);

		expect(result.items[0]).toBeInstanceOf(ContentUnitVantage);
		expect(result.items[0]?.id).toBe("unit-1");
		expect(result.items[0]?.key).toBe("tu1");
	});

	it("uses default values for invalid pagination metadata", () => {
		const result = collection.testPopulateCursor({
			data: [],
			meta: {
				count: "invalid",
				cursor: 123,
				hasMore: "true",
			},
		});

		expect(result.items).toEqual([]);
		expect(result.count).toBe(0);
		expect(result.cursor).toBeNull();
		expect(result.hasMore).toBe(false);
	});

	it("throws when data is not an array", () => {
		expect(() =>
			collection.testPopulateCursor({
				data: "invalid",
				meta: {},
			}),
		).toThrow(
			"Expected 'data' to be an array for cursor pagination but received: string",
		);
	});

	it("throws when meta is not an object", () => {
		expect(() =>
			collection.testPopulateCursor({
				data: [],
				meta: null,
			}),
		).toThrow(
			"Expected 'meta' to be an object for Vantage cursor pagination but received: object",
		);
	});

	it("throws when a data item is not an object", () => {
		expect(() =>
			collection.testPopulateCursor({
				data: [item, null],
				meta: {
					count: 2,
					cursor: null,
					hasMore: false,
				},
			}),
		).toThrow("Expected item at index 1 in 'data' to be an object");
	});
});
