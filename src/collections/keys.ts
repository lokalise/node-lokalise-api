import { BaseCollection } from './base_collection';
import { BulkUpdateKeysParams } from '../interfaces/bulk_update_key';
import { Key } from '../models/key';

export class Keys extends BaseCollection {
  protected static rootElementName:string = 'keys';
  protected static prefixURI:string = 'projects/{!:project_id}/keys/{:id}';
  protected static elementClass: Object = Key;

  bulk_update(project_id: string, keys: BulkUpdateKeysParams) {
    this.createPromise('PUT', { project_id: project_id }, this.returnBareJSON, 
                       this.returnBareJSON, keys, 'projects/{!:project_id}/keys');
  }
}
