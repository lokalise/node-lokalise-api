import { BaseCollection } from './base_collection';
import { Contributor } from '../models/contributor';
import { StandartParams } from '../interfaces/standart_params';

export class Contributors extends BaseCollection {
  protected static rootElementName:string = 'contributors';
  protected static prefixURI:string = 'projects/{!:project_id}/contributors/{:id}';
  protected static elementClass: Object = Contributor;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body,
                             'projects/{!:project_id}/contributors');
  }
}