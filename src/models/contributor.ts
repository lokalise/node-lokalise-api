import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';
import { Contributor as ContributorInterface } from "../interfaces/index";

export class Contributor extends BaseModel implements ContributorInterface {
  public user_id: number;
  public email: string;
  public fullname: string;
  public created_at: string;
  public created_at_timestamp: number;
  public is_admin: boolean;
  public is_reviewer: boolean;
  public languages: object;
  public admin_rights: string[];
}