import { Project as ProjectInterface } from "../interfaces/project.js";
import { ProjectSettings } from "../interfaces/project_settings.js";
import { ProjectStatistics } from "../interfaces/project_statistics.js";
import { BaseModel } from "./base_model.js";

export class Project extends BaseModel implements ProjectInterface {
  declare project_id: string;
  declare project_type: string;
  declare name: string;
  declare description: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare created_by: number;
  declare created_by_email: string;
  declare team_id: number;
  declare base_language_id: number;
  declare base_language_iso: string;
  declare settings: ProjectSettings;
  declare statistics: ProjectStatistics;
}
