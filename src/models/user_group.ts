import { BaseModel } from "./base_model.js";
import { UserGroup as UserGroupInterface } from "../interfaces/user_group.js";
import { Keyable } from "../interfaces/keyable.js";

export class UserGroup extends BaseModel implements UserGroupInterface {
  declare group_id: number;
  declare name: string;
  declare permissions: Keyable;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare team_id: number;
  declare projects: object[];
  declare members: number[];
}
