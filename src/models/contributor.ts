import { BaseModel } from "./base_model.js";
import { Contributor as ContributorInterface } from "../interfaces/contributor.js";
import { Keyable } from "../interfaces/keyable.js";

export class Contributor extends BaseModel implements ContributorInterface {
  declare user_id: number;
  declare email: string;
  declare fullname: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare is_admin: boolean;
  declare is_reviewer: boolean;
  declare languages: Keyable;
  declare admin_rights: string[];
}
