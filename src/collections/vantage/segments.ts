import type { CursorPaginatedResultVantage } from "../../interfaces/vantage/cursor_paginated_result.js";
import type {
	SegmentUpdateResultVantage,
	SegmentWarningVantage,
} from "../../interfaces/vantage/segment_update_result.js";
import { SegmentVantage } from "../../models/vantage/segment.js";
import type { SegmentParams, SegmentUpdateBody } from "../../types/vantage/segment.js";
import { isRecord } from "../../utils/type_guards.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class SegmentsVantage extends BaseCollectionVantage<SegmentVantage> {
	protected static override prefixURI =
		"projects/{!:project_id}/content-units/{!:content_unit_id}/segments/{:segment_id}";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => SegmentVantage {
		return SegmentVantage;
	}

	list(request_params: SegmentParams): Promise<CursorPaginatedResultVantage<SegmentVantage>> {
		return this.doListCursorVantage(request_params);
	}

	update(
		request_params: { project_id: string; segment_id: string },
		body: SegmentUpdateBody,
	): Promise<SegmentUpdateResultVantage> {
		return this.createPromise(
			"PATCH",
			request_params,
			(json, headers) => {
				const data = json.data;

				if (!isRecord(data)) {
					throw new Error("Expected 'data' to be an object");
				}

				const warnings = json.warnings;

				if (
					warnings !== undefined &&
					(!Array.isArray(warnings) ||
						!warnings.every(
							(warning) =>
								isRecord(warning) &&
								typeof warning.code === "string" &&
								(warning.details === undefined || isRecord(warning.details)),
						))
				) {
					throw new Error("Expected 'warnings' to be an array of warning objects");
				}

				return {
					data: this.populateObjectFromJson(data, headers) as SegmentVantage,
					...(warnings !== undefined ? { warnings: warnings as SegmentWarningVantage[] } : {}),
				};
			},
			body,
			"projects/{!:project_id}/segments/{!:segment_id}",
		);
	}
}
