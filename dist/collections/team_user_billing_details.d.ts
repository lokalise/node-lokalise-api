import { BaseCollection } from "./base_collection.js";
import { StandartParams } from "../interfaces/standart_params.js";
export declare class TeamUserBillingDetails extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    get(team_id: string | number, params?: StandartParams): Promise<any>;
    update(team_id: string | number, body: object | object[] | null, params?: StandartParams): Promise<any>;
}
