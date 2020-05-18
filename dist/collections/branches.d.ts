import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
export declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    merge(id: any, body?: any, params?: StandartParams): Promise<any>;
}
