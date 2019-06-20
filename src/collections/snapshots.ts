import { BaseCollection } from './base_collection';
import { Snapshot } from '../models/snapshot';
import { StandartParams } from '../interfaces/standart_params';

export class Snapshots extends BaseCollection {
  protected static rootElementName:string = 'snapshots';
  protected static rootElementNameSingular: string = 'snapshot';
  protected static prefixURI:string = 'projects/{!:project_id}/snapshots/{:id}';
  protected static elementClass: Object = Snapshot;

  restore(id, params: StandartParams){
    params['id'] = id;
    return this.createPromise('POST', params, this.returnBareJSON, this.handleReject, {});
  }

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}
