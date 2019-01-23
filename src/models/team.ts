import { BaseModel } from './base_model';

export class Team extends BaseModel {
  public  team_id: number;
  public  name: string;
  public  created_at: string;
  public  plan: string;
  public  quota_usage: object;
  public  quota_allowed: object;
}
