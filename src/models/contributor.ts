import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Contributor extends BaseModel {
  public user_id: number;
  public email: string;
  public fullname: string;
  public created_at: string;
  public is_admin: boolean;
  public is_reviewer: boolean;
  public languages: object;
  public admin_rights: string[];
}