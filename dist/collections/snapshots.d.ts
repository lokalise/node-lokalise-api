import { BaseCollection } from "./base_collection";
import { Snapshot } from "../models/snapshot";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    restore(id: string | number, params: StandartParams): Promise<Keyable>;
    create(body: object, params: StandartParams): Promise<Snapshot>;
}
