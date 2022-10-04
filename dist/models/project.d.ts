import { Project as ProjectInterface } from "../interfaces/project.js";
import { ProjectSettings } from "../interfaces/project_settings.js";
import { ProjectStatistics } from "../interfaces/project_statistics.js";
import { BaseModel } from "./base_model.js";
export declare class Project extends BaseModel implements ProjectInterface {
    project_id: string;
    project_type: string;
    name: string;
    description: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
    team_id: number;
    base_language_id: number;
    base_language_iso: string;
    settings: ProjectSettings;
    statistics: ProjectStatistics;
}
