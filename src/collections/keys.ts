import { BaseCollection } from './base_collection';
import { Key } from '../models/key';
import { StandartParams } from '../interfaces/standart_params';

export class Keys extends BaseCollection {
  protected static rootElementName:string = 'keys';
  protected static rootElementNameSingular: string = 'key';
  protected static prefixURI:string = 'projects/{!:project_id}/keys/{:id}';
  protected static elementClass: Object = Key;

  create(raw_body, params: StandartParams = {}): Promise<any> {
    const body = {'keys': raw_body};
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }

  bulk_update(raw_keys: object[], params: StandartParams) {
    const keys = {'keys': raw_keys};
    return this.createPromise('PUT', params, this.populateArrayFromJson,
      this.handleReject, keys, 'projects/{!:project_id}/keys');
  }

  bulk_delete(raw_keys: number[] | string[], params: StandartParams) : any {
    const keys = {'keys': raw_keys};
    return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, keys,
      'projects/{!:project_id}/keys');
  }
}
