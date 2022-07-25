import { BaseModel } from "./base_model.js";
import { Team as TeamInterface } from "../interfaces/team.js";

export class Team extends BaseModel implements TeamInterface {
  declare team_id: number;
  declare name: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare plan: string;
  declare quota_usage: object;
  declare quota_allowed: object;
}
