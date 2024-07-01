import { BaseModel } from "./base_model.js";
import { Team as TeamInterface } from "../interfaces/team.js";

export class Team extends BaseModel implements TeamInterface {
  declare team_id: number;
  declare name: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare plan: string;
  declare quota_usage: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
  declare quota_allowed: {
    users: number;
    keys: number;
    projects: number;
    mau: number;
    ai_words: number;
  };
}
