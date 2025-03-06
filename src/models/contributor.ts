import type { Contributor as ContributorInterface } from "../interfaces/contributor.js";
import { BaseModel } from "./base_model.js";

export class Contributor extends BaseModel implements ContributorInterface {
	declare user_id: number;
	declare email: string;
	declare fullname: string;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare is_admin: boolean; //deprecated
	declare is_reviewer: boolean; //deprecated
	declare languages: Array<{
		lang_id: number;
		lang_iso: string;
		lang_name: string;
		is_writable: boolean;
	}>;
	declare admin_rights: string[];
	declare role_id: number;
	declare uuid?: string;
}
