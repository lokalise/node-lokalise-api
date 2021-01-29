import { BaseCollection } from "./base_collection";
import { Key } from "../models/key";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class Keys extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(raw_body: Object | Array<Object>, params: StandartParams): Promise<Keyable>;
    update(id: string | number, body: Object, params: StandartParams): Promise<Key>;
    bulk_update(raw_keys: Object | Array<Object>, params: StandartParams): Promise<Keyable>;
    bulk_delete(raw_keys: number[] | string[], params: StandartParams): Promise<Keyable>;
}
