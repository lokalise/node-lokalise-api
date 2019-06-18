import { BaseModel } from './base_model';
import { UserGroup as UserGroupInterface } from "../interfaces";

export class UserGroup extends BaseModel implements UserGroupInterface {
  public group_id: number;
  public name: string;
  public permissions: object;
  public created_at: string;
  public created_at_timestamp: number;
  public team_id: number;
  public projects: object[];
  public members: number[];
}
