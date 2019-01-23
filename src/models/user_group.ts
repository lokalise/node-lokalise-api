import { BaseModel } from './base_model';

export class UserGroup extends BaseModel {
  public group_id: number;
  public name: string;
  public permissions: object;
  public created_at: string;
  public team_id: number;
  public projects: object[];
  public members: string[];
}
