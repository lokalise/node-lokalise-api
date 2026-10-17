import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import { ContentUnitVantage } from "../../models/vantage/content_unit.js";
import type { ContentUnitParams } from "../../types/vantage/content_unit_type.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ContentUnitsVantage extends BaseCollectionVantage<ContentUnitVantage> {
	protected static override prefixURI =
		"projects/{!:project_id}/items/{!:item_id}/content-units";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ContentUnitVantage {
		return ContentUnitVantage;
	}

	list(
		request_params: ContentUnitParams,
	): Promise<CursorPaginatedResultVantage<ContentUnitVantage>> {
		return this.doListCursorVantage(request_params);
	}
}
