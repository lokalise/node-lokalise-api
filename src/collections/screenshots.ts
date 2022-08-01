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

export class Screenshots extends BaseCollection {
  protected static rootElementName: string = "screenshots";
  protected static rootElementNameSingular: string = "screenshot";
  protected static prefixURI: string =
    "projects/{!:project_id}/screenshots/{:id}";
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
