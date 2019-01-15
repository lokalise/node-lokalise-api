import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class TeamUsers extends BaseModel {
  protected static rootElementName:string = 'team_users';
  protected static prefixURI:string = 'teams/{!:team_id}/users/{:id}';
  public user_id: number;
  public email: string;
  public fullname: string;
  public created_at: string;
  public role: string;
}
