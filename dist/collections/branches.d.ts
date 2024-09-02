import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Branch } from "../models/branch.js";
import type { BranchDeleted, BranchMerged, BranchParams, MergeBranchParams } from "../types/branches.js";
import type { ProjectOnly, ProjectWithPagination } from "../types/common_get_params.js";
import { BaseCollection } from "./base_collection.js";
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
