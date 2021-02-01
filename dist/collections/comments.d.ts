import { BaseCollection } from "./base_collection";
import { Comment } from "../models/comment";
import { StandartParams } from "../interfaces/standart_params";
import { PaginatedResult } from "../models/paginated_result";
export declare class Comments extends BaseCollection {
    protected static rootElementName: string;
    protected static rootElementNameSingular: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    create(raw_body: object | object[], params: StandartParams): Promise<Comment[]>;
    list_project_comments(params: StandartParams): Promise<PaginatedResult>;
}
