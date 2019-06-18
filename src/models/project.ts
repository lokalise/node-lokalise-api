import { Project as ProjectInterface } from '../interfaces/index';
import { BaseModel } from './base_model';
import { ApiRequest } from '../http_client/base';

export class Project extends BaseModel implements ProjectInterface {
  public project_id: string;
  public name: string;
  public description: string;
  public created_at: string;
  public created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
  public team_id: number;
  public base_language_id: number;
  public base_language_iso: string;
  public settings: object;
  public statistics: object;
}
