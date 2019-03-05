import { BaseCollection } from './base_collection';
import { BulkUpdateKeysParams } from '../interfaces/bulk_update_key';
import { Key } from '../models/key';
import { StandartParams } from '../interfaces/standart_params';

export class Keys extends BaseCollection {
  protected static rootElementName:string = 'keys';
  protected static prefixURI:string = 'projects/{!:project_id}/keys/{:id}';
  protected static elementClass: Object = Key;


 create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
 }

 bulk_update(keys: BulkUpdateKeysParams, params: StandartParams) {
   return this.createPromise('PUT', params, this.returnBareJSON, 
                       this.handleReject, keys, 'projects/{!:project_id}/keys');
 }

 bulk_delete(keys: BulkUpdateKeysParams, params: StandartParams) : any {
   return this.createPromise('DELETE', params, this.returnBareJSON, this.handleReject, keys,
                             'projects/{!:project_id}/keys');
 }
}
