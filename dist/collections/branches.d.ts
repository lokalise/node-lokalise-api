import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectOnly } from "../interfaces/project_only";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
interface BranchParams {
    name: string;
}
interface BranchDeleted {
    project_id: string;
    branch_deleted: boolean;
}
export declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Branch>>;
    create(branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    get(branch_id: string | number, request_params: ProjectOnly): Promise<Branch>;
    update(branch_id: string | number, branch_params: BranchParams, request_params: ProjectOnly): Promise<Branch>;
    delete(branch_id: string | number, request_params: ProjectOnly): Promise<BranchDeleted>;
    merge(branch_id: string | number, params: StandartParams, body?: object): Promise<Keyable>;
}
export {};
