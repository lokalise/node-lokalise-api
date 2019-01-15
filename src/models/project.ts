import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';
// import { Projects as ProjectsEndpoint } from '../endpoints/projects';
import { ApiRequest } from '../http_client/base';

export class Project extends BaseModel implements Interfaces.Project {
  protected static rootElementName:string = 'projects';
  protected static prefixURI:string = 'projects/{:id}';
  // protected static mandaratoryParams: Array<string> = ['name']
  // protected static optionalParams: Array<string> = ['description', 'team_id']

  public project_id: number;
  public name: string;
  public description: string;
  public team_id: number;
  public created_by_email: string;
  public created_at: string;
  public created_by: number;
}
