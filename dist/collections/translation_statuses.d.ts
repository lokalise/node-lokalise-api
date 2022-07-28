import { BaseCollection } from "./base_collection";
import { TranslationStatus } from "../models/translation_status";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class TranslationStatuses extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    protected static rootElementNameSingular: string;
    create(body: object, params: StandartParams): Promise<TranslationStatus>;
    update(id: string | number, body: object, params: StandartParams): Promise<TranslationStatus>;
    available_colors(params: StandartParams): Promise<Keyable>;
}
