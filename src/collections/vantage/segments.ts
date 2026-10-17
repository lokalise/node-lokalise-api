import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import { SegmentVantage } from "../../models/vantage/segment.js";
import type { SegmentParams } from "../../types/vantage/segment.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class SegmentsVantage extends BaseCollectionVantage<SegmentVantage> {
	protected static override prefixURI =
		"projects/{!:project_id}/content-units/{!:content_unit_id}/segments";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => SegmentVantage {
		return SegmentVantage;
	}

	list(
		request_params: SegmentParams,
	): Promise<CursorPaginatedResultVantage<SegmentVantage>> {
		return this.doListCursorVantage(request_params);
	}
}
