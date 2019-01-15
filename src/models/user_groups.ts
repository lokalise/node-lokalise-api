import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class UserGroups extends BaseModel {
  protected static rootElementName:string = 'user_groups';
  protected static prefixURI:string = 'teams/{!:team_id}/groups/{:id}';
  public group_id: number;
  public name: string;
  public permissions: object;
  public created_at: string;
  public team_id: number;
  public projects: object[];
  public members: string[];
}
