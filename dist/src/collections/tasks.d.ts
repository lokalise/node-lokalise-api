import { BaseCollection } from "./base_collection";
import { Task } from "../models/task";
import { StandartParams } from "../interfaces/standart_params";
export declare class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Task>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
}
