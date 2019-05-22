import { BaseCollection } from './base_collection';
import { Snapshot } from '../models/snapshot';
import { StandartParams } from '../interfaces/standart_params';

export class Snapshots extends BaseCollection {
  protected static rootElementName:string = 'snapshot';
  protected static prefixURI:string = 'projects/{!:project_id}/snapshots/{:id}';
  protected static elementClass: Object = Snapshot;

  restore(params: StandartParams){
    return this.createPromise('POST', params, this.returnBareJSON, this.handleReject, {});
  }
}
