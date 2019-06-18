import { Comment as CommentInterface } from "../interfaces/index";
import { BaseModel } from './base_model';

export class Comment extends BaseModel implements CommentInterface {
  public comment_id: number;
  public key_id: number;
  public comment: string;
  public added_by: number;
  public added_by_email: string;
  public added_at: string;
  public added_at_timestamp: number;
}