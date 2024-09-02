import { Jwt as JwtModel } from "../models/jwt.js";
import { BaseCollection } from "./base_collection.js";
export declare class Jwt extends BaseCollection {
    protected static prefixURI: string;
    protected static elementClass: typeof JwtModel;
    create(project_id: string, body?: {
        service: string;
    }): Promise<JwtModel>;
}
