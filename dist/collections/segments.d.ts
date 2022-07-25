import { BaseCollection } from "./base_collection.js";
import { StandartParams } from "../interfaces/standart_params.js";
export declare class Segments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    update(id: string | number, body: object | object[] | null, params?: StandartParams): Promise<any>;
}
