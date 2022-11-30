import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
interface ProjectListParams extends PaginationParams {
    filter_team_id?: number | string;
    filter_names?: string;
    include_statistics?: string | number;
    include_settings?: string | number;
}
type ProjectParams = {
    name: string;
    team_id?: number | string;
    description?: string;
    languages?: Array<{
        lang_iso: string;
        custom_iso?: string;
    }>;
    base_lang_iso?: string;
    project_type?: "localization_files" | "paged_documents";
    is_segmentation_enabled?: boolean;
};
type ProjectUpdateParams = {
    name: string;
    description?: string;
};
type ProjectDeleted = {
    project_id: string;
    project_deleted: boolean;
};
type ProjectEmptied = {
    project_id: string;
    keys_deleted: boolean;
};
export declare class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof Project;
    list(request_params?: ProjectListParams): Promise<PaginatedResult<Project>>;
    create(project_params: ProjectParams): Promise<Project>;
    get(project_id: string | number): Promise<Project>;
    update(project_id: string | number, project_params: ProjectUpdateParams): Promise<Project>;
    delete(project_id: string | number): Promise<ProjectDeleted>;
    empty(project_id: any): Promise<ProjectEmptied>;
}
export {};
