import { BaseCollection } from "./base_collection";
import { Snapshot } from "../models/snapshot";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { ProjectOnly } from "../interfaces/project_only";
import { Project } from "../models/project";
type CreateSnapshotParams = {
    title: string;
};
type SnapshotDeleted = {
    project_id: string;
    snapshot_deleted: boolean;
};
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
export {};
