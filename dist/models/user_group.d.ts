import { BaseModel } from "./base_model";
import { UserGroup as UserGroupInterface } from "../interfaces/user_group";
import { Keyable } from "../interfaces/keyable";
export declare class UserGroup extends BaseModel implements UserGroupInterface {
    group_id: number;
    name: string;
    permissions: Keyable;
    created_at: string;
    created_at_timestamp: number;
    team_id: number;
    projects: object[];
    members: number[];
}
