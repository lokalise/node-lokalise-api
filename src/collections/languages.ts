import { Language } from '../models/language';
import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';

export class Languages extends BaseCollection {
  protected static rootElementName:string = 'languages';
  protected static prefixURI:string = 'projects/{!:project_id}/languages/{:id}';
  protected static elementClass: Object = Language;

  system_languages(params: StandartParams): Promise<any> {
    return this.createPromise('GET', {}, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
  }

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
  }
}
