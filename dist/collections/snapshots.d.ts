import { BaseCollection } from "./base_collection.js";
import { Snapshot } from "../models/snapshot.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Snapshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    restore(id: string | number, params: StandartParams): Promise<Keyable>;
    create(body: object, params: StandartParams): Promise<Snapshot>;
}
