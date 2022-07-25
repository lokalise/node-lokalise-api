import { BaseCollection } from "./base_collection.js";
import { TeamUser } from "../models/team_user.js";
import { StandartParams } from "../interfaces/standart_params.js";
export declare class TeamUsers extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    update(id: string | number, body: object, params: StandartParams): Promise<TeamUser>;
}
