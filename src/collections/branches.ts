import { BaseCollection } from './base_collection';
import { Branch } from '../models/branch';
import { StandartParams } from '../interfaces/standart_params';

export class Branches extends BaseCollection {
  protected static rootElementName: string = 'branches';
  protected static rootElementNameSingular: string = 'branch';
  protected static prefixURI: string = 'projects/{!:project_id}/branches/{:id}';
  protected static elementClass: Object = Branch;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}