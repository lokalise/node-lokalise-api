import { BaseModel } from "./base_model";
import { UserGroup as UserGroupInterface } from "../interfaces/user_group";

export class UserGroup extends BaseModel implements UserGroupInterface {
  declare group_id: number;
  declare name: string;
  declare permissions: {
    is_admin: boolean;
    is_reviewer: boolean;
    admin_rights: string[];
    languages: Array<{
      lang_id: number;
      lang_iso: string;
      lang_name: string;
      is_writable: boolean;
    }>;
  };
  declare created_at: string;
  declare created_at_timestamp: number;
  declare team_id: number;
  declare projects: string[] | number[];
  declare members: number[] | string[];
}
