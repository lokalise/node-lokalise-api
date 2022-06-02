import { BaseModel } from "./base_model";
import { TeamUser as TeamUserInterface } from "../interfaces/team_user";

export class TeamUser extends BaseModel implements TeamUserInterface {
  declare user_id: number;
  declare email: string;
  declare fullname: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare role: string;
}
