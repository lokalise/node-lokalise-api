import { Project as ProjectInterface } from "../interfaces/project";
import { ProjectSettings } from "../interfaces/project_settings";
import { ProjectStatistics } from "../interfaces/project_statistics";
import { BaseModel } from "./base_model";

export class Project extends BaseModel implements ProjectInterface {
  public project_id: string;
  public project_type: string;
  public name: string;
  public description: string;
  public created_at: string;
  public created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
  public team_id: number;
  public base_language_id: number;
  public base_language_iso: string;
  public settings: ProjectSettings;
  public statistics: ProjectStatistics;
}
