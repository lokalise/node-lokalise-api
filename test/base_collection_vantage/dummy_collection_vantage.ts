import { BaseCollectionVantage } from "../../src/collections/base_collection_vantage.js";
import { ContentUnitVantage } from "../../src/models/vantage/content_unit.js";
import type { CursorPaginatedResultVantage } from "../../src/models/vantage/cursor_paginated_result.js";

export class DummyCollectionVantage extends BaseCollectionVantage<ContentUnitVantage> {
	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => ContentUnitVantage {
		return ContentUnitVantage;
	}

	public testPopulateCursor(
		json: Record<string, unknown>,
	): CursorPaginatedResultVantage<ContentUnitVantage> {
		return this.populateArrayFromJsonCursorVantage(json, new Headers());
	}
}
