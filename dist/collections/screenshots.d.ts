import { BaseCollection } from "./base_collection.js";
import { Screenshot } from "../models/screenshot.js";
import { StandartParams } from "../interfaces/standart_params.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(raw_body: object | object[], params: StandartParams): Promise<Keyable>;
    update(id: string | number, body: object, params: StandartParams): Promise<Screenshot>;
}
