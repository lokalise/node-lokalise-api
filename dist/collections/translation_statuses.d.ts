import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
export declare class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    protected static rootElementNameSingular: string;
    create(body: any, params?: StandartParams): Promise<any>;
    update(id: any, body: any, params?: StandartParams): Promise<any>;
    available_colors(params?: StandartParams): Promise<any>;
}
