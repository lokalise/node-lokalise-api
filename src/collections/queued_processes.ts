import { QueuedProcess } from "../models/queued_process.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type {
  ProjectWithPagination,
  ProjectOnly,
} from "../types/common_get_params.js";

export class QueuedProcesses extends BaseCollection {
  protected static rootElementName = "processes";
  protected static rootElementNameSingular = "process";
  protected static prefixURI = "projects/{!:project_id}/processes/{:id}";
  protected static elementClass = QueuedProcess;

  list(
    request_params: ProjectWithPagination,
  ): Promise<PaginatedResult<QueuedProcess>> {
    return this.doList(request_params);
  }

  get(
    process_id: string | number,
    request_params: ProjectOnly,
  ): Promise<QueuedProcess> {
    return this.doGet(process_id, request_params);
  }
}
