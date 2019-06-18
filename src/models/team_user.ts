import { BaseModel } from './base_model';
import { TeamUser as TeamUserInterface } from "../interfaces";

export class TeamUser extends BaseModel implements TeamUserInterface {
  public user_id: number;
  public email: string;
  public fullname: string;
  public created_at: string;
  public created_at_timestamp: number;
  public role: string;
}
