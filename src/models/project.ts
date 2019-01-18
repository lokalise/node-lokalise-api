import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';
import { ApiRequest } from '../http_client/base';

export class Project extends BaseModel implements Interfaces.Project {
  protected static rootElementName:string = 'projects';
  protected static prefixURI:string = 'projects/{:id}';

  public project_id: number;
  public name: string;
  public description: string;
  public team_id: number;
  public created_by_email: string;
  public created_at: string;
  public created_by: number;

  empty(project_id) {
    this.createPromise('PUT', { project_id: project_id}, 
                       this.populateObjectFromJson, this.handleReject, null, 'projects/{!:project_id}/empty');
  }
}
