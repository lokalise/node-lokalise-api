import { BulkResult } from "../interfaces/bulk_result.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
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
export declare class Screenshots extends BaseCollection {
	protected static rootElementName: string;
	protected static rootElementNameSingular: string;
	protected static prefixURI: string;
	protected static elementClass: object;
	list(
		request_params: ProjectWithPagination,
	): Promise<PaginatedResult<Screenshot>>;
	create(
		raw_body: CreateScreenshotParams | CreateScreenshotParams[],
		request_params: ProjectOnly,
	): Promise<BulkResult<Screenshot>>;
	get(
		screnshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<Screenshot>;
	update(
		screenshot_id: string | number,
		screenshot_params: UpdateScreenshotParams,
		request_params: ProjectOnly,
	): Promise<Screenshot>;
	delete(
		screenshot_id: string | number,
		request_params: ProjectOnly,
	): Promise<ScreenshotDeleted>;
}
