import { BaseCollection } from "./base_collection";
import { UserGroup } from "../models/user_group";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<UserGroup>;
    update(id: string | number, body: object, params: StandartParams): Promise<UserGroup>;
    add_members_to_group(team_id: string | number, group_id: string | number, raw_body: string[] | number[]): Promise<UserGroup>;
    remove_members_from_group(team_id: string | number, group_id: string | number, raw_body: string[] | number[]): Promise<UserGroup>;
    add_projects_to_group(team_id: string | number, group_id: string | number, raw_body: string[] | number[]): Promise<UserGroup>;
    remove_projects_from_group(team_id: string | number, group_id: string | number, raw_body: string[] | number[]): Promise<UserGroup>;
    protected populateGroupFromJsonRoot(json: Keyable, headers: object): this;
}
