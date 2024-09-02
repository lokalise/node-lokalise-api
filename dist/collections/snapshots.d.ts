import type { PaginatedResult } from "../interfaces/paginated_result.js";
import type { Project } from "../models/project.js";
import { Snapshot } from "../models/snapshot.js";
import type { ProjectOnly, ProjectWithPagination } from "../types/common_get_params.js";
import type { CreateSnapshotParams, SnapshotDeleted } from "../types/snapshots.js";
import { BaseCollection } from "./base_collection.js";
export declare class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Snapshot;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Snapshot>>;
    create(snapshot_params: CreateSnapshotParams, request_params: ProjectOnly): Promise<Snapshot>;
    restore(snapshot_id: string | number, request_params: ProjectOnly): Promise<Project>;
    delete(snapshot_id: string | number, request_params: ProjectOnly): Promise<SnapshotDeleted>;
}
