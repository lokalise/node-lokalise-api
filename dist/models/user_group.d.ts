import { BaseModel } from './base_model';
import { UserGroup as UserGroupInterface } from "../interfaces";
export declare class UserGroup extends BaseModel implements UserGroupInterface {
    group_id: number;
    name: string;
    permissions: object;
    created_at: string;
    created_at_timestamp: number;
    team_id: number;
    projects: object[];
    members: number[];
}
