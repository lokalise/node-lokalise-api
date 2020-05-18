import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
export declare class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    restore(id: any, params: StandartParams): Promise<any>;
    create(body: any, params?: StandartParams): Promise<any>;
}
