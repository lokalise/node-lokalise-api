import { Branch as BranchInterface } from "../interfaces/branch.js";
import { BaseModel } from "./base_model.js";
export declare class Branch extends BaseModel implements BranchInterface {
    branch_id: number;
    name: string;
    created_at: string;
    created_at_timestamp: number;
    created_by: number;
    created_by_email: string;
}
