import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class TeamUsers extends BaseModel {
  protected static rootElementName:string = 'team_users';
  protected static prefixURI:string = 'projects/{!:project_id}/users/{:id}';
  public filename: string;
  public key_count: number;
}
