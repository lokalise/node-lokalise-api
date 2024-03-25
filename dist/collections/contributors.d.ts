import { BaseCollection } from "./base_collection.js";
import { Contributor } from "../models/contributor.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { ProjectWithPagination, ProjectOnly } from "../types/common_get_params.js";
import type { ContributorCreateData, ContributorUpdateData, ContributorDeleted } from "../types/contributors.js";
export declare class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Contributor;
    list(request_params: ProjectWithPagination): Promise<PaginatedResult<Contributor>>;
    create(contributor_params: ContributorCreateData | ContributorCreateData[], request_params: ProjectOnly): Promise<Contributor[]>;
    get(contributor_id: string | number, request_params: ProjectOnly): Promise<Contributor>;
    update(contributor_id: string | number, contributor_params: ContributorUpdateData, request_params: ProjectOnly): Promise<Contributor>;
    delete(contributor_id: string | number, request_params: ProjectOnly): Promise<ContributorDeleted>;
}
