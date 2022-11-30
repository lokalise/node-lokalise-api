import { BaseCollection } from "./base_collection.js";
import { Branch } from "../models/branch.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { ProjectOnly } from "../interfaces/project_only.js";
type BranchParams = {
    name?: string;
};
type MergeBranchParams = {
    force_conflict_resolve_using?: string;
    target_branch_id?: number | string;
};
type BranchDeleted = {
    project_id: string;
    branch_deleted: boolean;
};
type BranchMerged = {
    project_id: string;
    branch_merged: boolean;
    branch: Branch;
    target_branch: Branch;
};
export declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Branch;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Branch>>;
    create(branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    get(branch_id: string | number, request_params: ProjectOnly): Promise<Branch>;
    update(branch_id: string | number, branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    delete(branch_id: string | number, request_params: ProjectOnly): Promise<BranchDeleted>;
    merge(branch_id: string | number, request_params: ProjectOnly, body?: MergeBranchParams): Promise<BranchMerged>;
}
export {};
