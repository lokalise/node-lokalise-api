import { BaseCollection } from "./base_collection.js";
import { Contributor } from "../models/contributor.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectOnly } from "../interfaces/project_only.js";
type ContributorLanguages = {
    lang_iso: string;
    is_writable?: boolean;
};
type ContributorRights = "upload" | "activity" | "download" | "settings" | "create_branches" | "statistics" | "keys" | "screenshots" | "glossary" | "contributors" | "languages" | "tasks";
type ContributorCreateData = {
    email: string;
    fullname?: string;
    is_admin?: boolean;
    is_reviewer?: boolean;
    languages: ContributorLanguages[];
    admin_rights?: ContributorRights[];
};
type ContributorUpdateData = {
    is_admin?: boolean;
    is_reviewer?: boolean;
    languages?: ContributorLanguages[];
    admin_rights?: ContributorRights[];
};
type ContributorDeleted = {
    project_id: string;
    contributor_deleted: boolean;
};
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
export {};
