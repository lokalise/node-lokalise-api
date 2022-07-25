import { Comment as CommentInterface } from "../interfaces/comment.js";
import { BaseModel } from "./base_model.js";

export class Comment extends BaseModel implements CommentInterface {
  declare comment_id: number;
  declare key_id: number;
  declare comment: string;
  declare added_by: number;
  declare added_by_email: string;
  declare added_at: string;
  declare added_at_timestamp: number;
}
