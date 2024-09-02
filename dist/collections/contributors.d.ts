import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { Contributor } from "../models/contributor.js";
import type { ProjectOnly, ProjectWithPagination } from "../types/common_get_params.js";
import type { ContributorCreateData, ContributorDeleted, ContributorUpdateData } from "../types/contributors.js";
import { BaseCollection } from "./base_collection.js";
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
