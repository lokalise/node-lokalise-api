import { BaseCollection } from "./base_collection";
import { Screenshot } from "../models/screenshot";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class Screenshots extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    create(raw_body: Object | Array<Object>, params: StandartParams): Promise<Keyable>;
    update(id: string | number, body: Object, params: StandartParams): Promise<Screenshot>;
}
