import { BaseCollection } from "./base_collection";
import { Keyable } from "../interfaces/keyable";
export declare class Projects extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    empty(project_id: any): Promise<Keyable>;
}
