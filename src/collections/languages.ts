import { Language } from '../models/language';
import { BaseCollection } from './base_collection';
import { ApiRequest } from '../http_client/base';

export class Languages extends BaseCollection {
  protected static rootElementName:string = 'projects';
  protected static prefixURI:string = 'projects/{!:project_id}/languages/{:id}';
  protected static elementClass: Object = Language;

  system_languages() {
    this.createPromise('GET', {}, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
  }
}
