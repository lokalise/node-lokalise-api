import { BaseModel } from "./base_model.js";
import { Contributor as ContributorInterface } from "../interfaces/contributor.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Contributor extends BaseModel implements ContributorInterface {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    is_admin: boolean;
    is_reviewer: boolean;
    languages: Keyable;
    admin_rights: string[];
}
