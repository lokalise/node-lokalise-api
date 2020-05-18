import { Comment as CommentInterface } from "../interfaces/index";
import { BaseModel } from "./base_model";
export declare class Comment extends BaseModel implements CommentInterface {
    comment_id: number;
    key_id: number;
    comment: string;
    added_by: number;
    added_by_email: string;
    added_at: string;
    added_at_timestamp: number;
}
