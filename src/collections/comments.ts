import { BaseCollection } from './base_collection';
import { Comment } from '../models/comment';
import { StandartParams } from '../interfaces/standart_params';

export class Comments extends BaseCollection {
  protected static rootElementName:string = 'comments';
  protected static rootElementNameSingular: string = 'comment';
  protected static prefixURI:string = 'projects/{!:project_id}/keys/{!:key_id}/comments/{:id}';
  protected static elementClass: Object = Comment;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
  }

  list_project_comments(params: StandartParams = {}) : Promise<any[]> {
    return this.createPromise('GET', { project_id: params['project_id'] }, 
                       this.populateArrayFromJson, this.handleReject, null, 
                       'projects/{!:project_id}/comments');
  }
}