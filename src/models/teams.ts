import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Teams extends BaseModel {
  protected static rootElementName:string = 'tasks';
  protected static prefixURI:string = 'teams/{:id}';
  public  team_id: number;
  public  name: string;
  public  created_at: string;
  public  plan: string;
  public  quota_usage: object;
  public  quota_allowed: object;
}
