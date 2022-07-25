import { BaseCollection } from "./base_collection.js";
import { Task } from "../models/task.js";
import { StandartParams } from "../interfaces/standart_params.js";
export declare class Tasks extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(body: object, params: StandartParams): Promise<Task>;
    update(id: any, body: any, params: StandartParams): Promise<any>;
}
