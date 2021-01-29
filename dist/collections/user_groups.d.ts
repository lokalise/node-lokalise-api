import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
export declare class UserGroups extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params: StandartParams): Promise<any>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
    add_members_to_group(team_id: any, group_id: any, raw_body: any[], params?: any): Promise<any>;
    remove_members_from_group(team_id: any, group_id: any, raw_body: any[], params?: any): Promise<any>;
    add_projects_to_group(team_id: any, group_id: any, raw_body: any[], params?: any): Promise<any>;
    remove_projects_from_group(team_id: any, group_id: any, raw_body: any[], params?: any): Promise<any>;
    protected populateGroupFromJsonRoot(json: any, headers: any): this;
}
