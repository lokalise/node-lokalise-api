import { Project as ProjectInterface } from '../interfaces/index';
import { BaseModel } from './base_model';
import { ApiRequest } from '../http_client/base';

export class Project extends BaseModel implements ProjectInterface {
  public project_id: number;
  public name: string;
  public description: string;
  public team_id: number;
  public created_by_email: string;
  public created_at: string;
  public created_by: number;
}
