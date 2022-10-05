import { QueuedProcess } from "../models/queued_process.js";
import { BaseCollection } from "./base_collection.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectOnly } from "../interfaces/project_only.js";
export declare class QueuedProcesses extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof QueuedProcess;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<QueuedProcess>>;
    get(process_id: string | number, request_params: ProjectOnly): Promise<QueuedProcess>;
}
