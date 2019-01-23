import { BaseCollection } from './base_collection';
import { Comment } from '../models/comment';

export class Comments extends BaseCollection {
  protected static rootElementName:string = 'comments';
  protected static prefixURI:string = 'projects/{!:project_id}/comments/{:id}';
  protected static elementClass: Object = Comment;
}