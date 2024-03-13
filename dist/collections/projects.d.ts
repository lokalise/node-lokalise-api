import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
import { PaginationParams } from "../interfaces/pagination_params.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { CreateProjectParams } from "../types/create_project_params.js";
import { UpdateProjectParams } from "../types/update_project_params.js";
interface ProjectListParams extends PaginationParams {
    filter_team_id?: number | string;
    filter_names?: string;
    include_statistics?: string | number;
    include_settings?: string | number;
}
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
    create(project_params: CreateProjectParams): Promise<Project>;
    get(project_id: string | number): Promise<Project>;
    update(project_id: string | number, project_params: UpdateProjectParams): Promise<Project>;
    delete(project_id: string | number): Promise<ProjectDeleted>;
    empty(project_id: any): Promise<ProjectEmptied>;
}
export {};
