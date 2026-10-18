import type { CursorPaginatedResultVantage } from "../../models/vantage/cursor_paginated_result.js";
import { ExportVantage } from "../../models/vantage/export.js";
import { ExportDownloadUrlVantage } from "../../models/vantage/export_download_url.js";
import type {
	ExportListParams,
	ExportParams,
} from "../../types/vantage/export.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class ExportsVantage extends BaseCollectionVantage<ExportVantage> {
	protected static override prefixURI =
		"projects/{!:project_id}/exports/{:export_id}";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => ExportVantage {
		return ExportVantage;
	}

	list(
		request_params: ExportListParams,
	): Promise<CursorPaginatedResultVantage<ExportVantage>> {
		return this.doListCursorVantage(request_params);
	}

	get(request_params: {
		project_id: string;
		export_id: string;
	}): Promise<ExportVantage> {
		return this.doGetVantage(request_params);
	}

	create(
		request_params: { project_id: string },
		body: ExportParams,
	): Promise<ExportVantage> {
		return this.createPromise(
			"POST",
			request_params,
			this.populateObjectFromJsonRoot,
			body,
		);
	}

	getDownloadUrl(request_params: {
		project_id: string;
		export_id: string;
	}): Promise<ExportDownloadUrlVantage> {
		return this.createPromise(
			"GET",
			request_params,
			(json) =>
				new ExportDownloadUrlVantage(json.data as Record<string, unknown>),
			null,
			"projects/{!:project_id}/exports/{!:export_id}/download-url",
		);
	}
}
