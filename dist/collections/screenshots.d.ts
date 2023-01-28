import { BaseCollection } from "./base_collection";
import { Screenshot } from "../models/screenshot";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { ProjectOnly } from "../interfaces/project_only";
import { BulkResult } from "../interfaces/bulk_result";
type CreateScreenshotParams = {
    data: string;
    title?: string;
    description?: string;
    ocr?: boolean;
    key_ids?: string[] | number[];
    tags?: string[];
};
type UpdateScreenshotParams = Omit<CreateScreenshotParams, "data" | "ocr">;
type ScreenshotDeleted = {
    project_id: string;
    screenshot_deleted: boolean;
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
