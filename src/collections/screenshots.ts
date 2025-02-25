import type { BulkResult } from "../interfaces/bulk_result.js";
import type { Keyable } from "../interfaces/keyable.js";
import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Screenshot } from "../models/screenshot.js";
import type {
	ProjectOnly,
	ProjectWithPagination,
} from "../types/common_get_params.js";
import type {
	CreateScreenshotParams,
	ScreenshotDeleted,
	UpdateScreenshotParams,
} from "../types/screenshots.js";
import { BaseCollection } from "./base_collection.js";

export class Screenshots extends BaseCollection<Screenshot> {
	protected static override prefixURI =
		"projects/{!:project_id}/screenshots/{:id}";

	protected get elementClass(): new (
		json: Keyable,
	) => Screenshot {
		return Screenshot;
	}

	protected override get rootElementName(): string {
		return "screenshots";
	}

	protected override get rootElementNameSingular(): string | null {
		return "screenshot";
	}

	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Screenshot>> {
		return this.doList(request_params) as Promise<PaginatedResult<Screenshot>>;
	}

	create(
		raw_body: CreateScreenshotParams | CreateScreenshotParams[],
		request_params: ProjectOnly,
	): Promise<BulkResult<Screenshot>> {
		const body = { screenshots: this.objToArray(raw_body) };

		return this.createPromise(
			"POST",
			request_params,
			this.populateArrayFromJsonBulk,
			body,
		);
	}

	get(
		screnshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<Screenshot> {
		return this.doGet(screnshot_id, request_params);
	}

	update(
		screenshot_id: string | number,
		screenshot_params: UpdateScreenshotParams,
		request_params: ProjectOnly,
	): Promise<Screenshot> {
		return this.doUpdate(screenshot_id, screenshot_params, request_params);
	}

	delete(
		screenshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<ScreenshotDeleted> {
		return this.doDelete(screenshot_id, request_params);
	}
}
