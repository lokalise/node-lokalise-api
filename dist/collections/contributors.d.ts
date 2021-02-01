import { BaseCollection } from "./base_collection";
import { Contributor } from "../models/contributor";
import { StandartParams } from "../interfaces/standart_params";
export declare class Contributors extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(raw_body: object | object[], params: StandartParams): Promise<Contributor[]>;
    update(id: string | number, body: object, params: StandartParams): Promise<Contributor>;
}
