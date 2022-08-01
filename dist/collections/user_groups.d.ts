import { BaseCollection } from "./base_collection";
import { UserGroup } from "../models/user_group";
import { Keyable } from "../interfaces/keyable";
import { TeamWithPagination } from "../interfaces/team_with_pagination";
import { PaginatedResult } from "../interfaces/paginated_result";
import { TeamOnly } from "../interfaces/team_only";
declare type GroupLanguages = {
    reference: string[];
    contributable: string[];
};
declare type AdminRights = "upload" | "activity" | "download" | "settings" | "create_branches" | "statistics" | "keys" | "screenshots" | "glossary" | "contributors" | "languages" | "tasks";
declare type UserGroupParams = {
    name: string;
    is_reviewer: boolean;
    is_admin: boolean;
    admin_rights?: AdminRights[];
    languages?: GroupLanguages;
};
declare type UserGroupDeleted = {
    team_id: string;
    group_deleted: boolean;
};
export declare class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof UserGroup;
    list(request_params: TeamWithPagination): Promise<PaginatedResult<UserGroup>>;
    create(user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    get(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroup>;
    update(user_group_id: string | number, user_group_params: UserGroupParams, request_params: TeamOnly): Promise<UserGroup>;
    delete(user_group_id: string | number, request_params: TeamOnly): Promise<UserGroupDeleted>;
    add_members_to_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    remove_members_from_group(team_id: string | number, group_id: string | number, user_ids: string[] | number[]): Promise<UserGroup>;
    add_projects_to_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    remove_projects_from_group(team_id: string | number, group_id: string | number, project_ids: string[] | number[]): Promise<UserGroup>;
    protected populateGroupFromJsonRoot(json: Keyable, headers: Keyable): this;
}
export {};
