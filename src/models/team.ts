import { BaseModel } from './base_model';
import { Team as TeamInterface } from "../interfaces";

export class Team extends BaseModel implements TeamInterface {
  public team_id: number;
  public name: string;
  public created_at: string;
  public created_at_timestamp: number;
  public plan: string;
  public quota_usage: object;
  public quota_allowed: object;
}
