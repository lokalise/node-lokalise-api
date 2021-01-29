import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";
export declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: Object, params: StandartParams): Promise<Branch>;
    update(id: string | number, body: Object, params: StandartParams): Promise<Branch>;
    merge(id: string | number, params: StandartParams, body?: Object): Promise<Object>;
}
