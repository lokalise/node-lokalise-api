import { BaseCollection } from "./base_collection";
import { Webhook } from "../models/webhook";
import { StandartParams } from "../interfaces/standart_params";
import { Keyable } from "../interfaces/keyable";
export declare class Webhooks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Webhook>;
    update(id: string | number, body: object, params: StandartParams): Promise<Webhook>;
    regenerate_secret(id: string | number, params: StandartParams): Promise<Keyable>;
}
