import { BaseCollection } from "./base_collection.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    empty(project_id: any): Promise<Keyable>;
}
