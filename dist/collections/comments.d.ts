import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
export declare class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(body: any, params?: StandartParams): Promise<any>;
    list_project_comments(params?: StandartParams): Promise<any[]>;
}
