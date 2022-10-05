import { BaseCollection } from "./base_collection.js";
import { Screenshot } from "../models/screenshot.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
import { BulkResult } from "../interfaces/bulk_result.js";

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

export class Screenshots extends BaseCollection {
  protected static rootElementName = "screenshots";
  protected static rootElementNameSingular = "screenshot";
  protected static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
  protected static elementClass: object = Screenshot;

  list(
    request_params: ProjectWithPagination
  ): Promise<PaginatedResult<Screenshot>> {
    return this.doList(request_params);
  }

  create(
    raw_body: CreateScreenshotParams | CreateScreenshotParams[],
    request_params: ProjectOnly
  ): Promise<BulkResult<Screenshot>> {
    const body = { screenshots: this.objToArray(raw_body) };
    return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
  }

  get(
    screnshot_id: string | number,
    request_params: ProjectOnly
  ): Promise<Screenshot> {
    return this.doGet(screnshot_id, request_params);
  }

  update(
    screenshot_id: string | number,
    screenshot_params: UpdateScreenshotParams,
    request_params: ProjectOnly
  ): Promise<Screenshot> {
    return this.doUpdate(screenshot_id, screenshot_params, request_params);
  }

  delete(
    screenshot_id: string | number,
    request_params: ProjectOnly
  ): Promise<ScreenshotDeleted> {
    return this.doDelete(screenshot_id, request_params);
  }
}
