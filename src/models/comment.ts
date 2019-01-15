import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';

export class Comment extends BaseModel implements Interfaces.Comment {
  protected static rootElementName:string = 'comments';
  protected static prefixURI:string = 'projects/{!:project_id}/comments/{:id}';
  public comment_id: number;
  public key_id: number;
  public comment: string;
  public added_by: number;
  public added_by_email: string;
  public added_at: string;
}