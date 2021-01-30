import { BaseCollection } from "./base_collection";
import { Branch } from "../models/branch";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class Branches extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Branch>;
    update(id: string | number, body: object, params: StandartParams): Promise<Branch>;
    merge(id: string | number, params: StandartParams, body?: object): Promise<Keyable>;
}
