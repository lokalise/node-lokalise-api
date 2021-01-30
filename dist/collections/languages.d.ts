import { Language } from "../models/language";
import { BaseCollection } from "./base_collection";
import { StandartParams } from "../interfaces/standart_params";
import { PaginatedResult } from "../models/paginated_result";
import { Keyable } from "../interfaces/keyable";
export declare class Languages extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    system_languages(params: StandartParams): Promise<PaginatedResult>;
    create(raw_body: object | object[], params: StandartParams): Promise<Keyable>;
    update(id: string | number, body: object, params: StandartParams): Promise<Language>;
}
