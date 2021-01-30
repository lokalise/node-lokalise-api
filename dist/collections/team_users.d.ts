import { BaseCollection } from "./base_collection";
import { TeamUser } from "../models/team_user";
import { StandartParams } from "../interfaces/standart_params";
export declare class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    update(id: string | number, body: object, params: StandartParams): Promise<TeamUser>;
}
