import { BaseModel } from './base_model';

export class TeamUser extends BaseModel {
  public user_id: number;
  public email: string;
  public fullname: string;
  public created_at: string;
  public role: string;
}
