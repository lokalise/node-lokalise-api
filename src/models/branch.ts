import { Branch as BranchInterface } from "../interfaces/index";
import { BaseModel } from "./base_model";

export class Branch extends BaseModel implements BranchInterface {
  public branch_id: number;
  public name: string;
  public created_at: string;
  public created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
}
