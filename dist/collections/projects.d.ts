import { Project } from "../models/project.js";
import { BaseCollection } from "./base_collection.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import type { CreateProjectParams, UpdateProjectParams, ProjectDeleted, ProjectEmptied, ProjectListParams } from "../types/projects.js";
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
