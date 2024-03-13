import { BaseCollection } from "./base_collection.js";
import { Screenshot } from "../models/screenshot.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { BulkResult } from "../interfaces/bulk_result.js";
import { CreateScreenshotParams } from "../types/create_screenshot_params.js";
import { UpdateScreenshotParams } from "../types/update_screenshot_params.js";
type ScreenshotDeleted = {
    project_id: string;
    screenshot_deleted: boolean;
    branch?: string;
};
export declare class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Screenshot>>;
    create(raw_body: CreateScreenshotParams | CreateScreenshotParams[], request_params: ProjectOnly): Promise<BulkResult<Screenshot>>;
    get(screnshot_id: string | number, request_params: ProjectOnly): Promise<Screenshot>;
    update(screenshot_id: string | number, screenshot_params: UpdateScreenshotParams, request_params: ProjectOnly): Promise<Screenshot>;
    delete(screenshot_id: string | number, request_params: ProjectOnly): Promise<ScreenshotDeleted>;
}
export {};
