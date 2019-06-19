import { BaseCollection } from './base_collection';
import { Contributor } from '../models/contributor';
import { StandartParams } from '../interfaces/standart_params';

export class Contributors extends BaseCollection {
  protected static rootElementName:string = 'contributors';
  protected static rootElementNameSingular: string = 'contributor';
  protected static prefixURI:string = 'projects/{!:project_id}/contributors/{:id}';
  protected static elementClass: Object = Contributor;

  create(raw_body, params: StandartParams = {}): Promise<any> {
    const body = {'contributors': raw_body};
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body,
                             'projects/{!:project_id}/contributors');
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}