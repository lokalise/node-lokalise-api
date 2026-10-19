import type { CursorPaginatedResultVantage } from "../../models/vantage/cursor_paginated_result.js";
import { UploadVantage } from "../../models/vantage/upload.js";
import { UploadStageVantage } from "../../models/vantage/upload_stage.js";
import type {
	UploadCompleteParams,
	UploadListParams,
	UploadStageParams,
} from "../../types/vantage/upload.js";
import { BaseCollectionVantage } from "../base_collection_vantage.js";

export class UploadsVantage extends BaseCollectionVantage<UploadVantage> {
	protected static override prefixURI = "projects/{!:project_id}/uploads";

	protected override get elementClass(): new (
		json: Record<string, unknown>,
	) => UploadVantage {
		return UploadVantage;
	}

	list(
		request_params: UploadListParams,
	): Promise<CursorPaginatedResultVantage<UploadVantage>> {
		return this.doListCursorVantage(request_params);
	}

	create(
		request_params: { project_id: string },
		body: UploadStageParams,
	): Promise<UploadStageVantage> {
		return this.createPromise(
			"POST",
			request_params,
			(json) => new UploadStageVantage(json.data as Record<string, unknown>),
			body,
		);
	}

	complete(
		request_params: { project_id: string },
		body: UploadCompleteParams,
	): Promise<void> {
		return this.createNoContentPromise(
			"POST",
			request_params,
			body,
			"projects/{!:project_id}/uploads/actions/complete",
		);
	}
}
