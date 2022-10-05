import { BaseModel } from "./base_model.js";
import { Contributor as ContributorInterface } from "../interfaces/contributor.js";
export declare class Contributor extends BaseModel implements ContributorInterface {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    is_admin: boolean;
    is_reviewer: boolean;
    languages: Array<{
        lang_id: number;
        lang_iso: string;
        lang_name: string;
        is_writable: boolean;
    }>;
    admin_rights: string[];
}
