import type { Branch as BranchInterface } from "../interfaces/branch.js";
import { BaseModel } from "./base_model.js";

export class Branch extends BaseModel implements BranchInterface {
	declare branch_id: number;
	declare name: string;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare created_by: number;
	declare created_by_email: string;
}
