import { Language } from '../models/language';
import { BaseCollection } from './base_collection';
import { StandartParams } from '../interfaces/standart_params';

export class Languages extends BaseCollection {
  protected static rootElementName:string = 'languages';
  protected static rootElementNameSingular: string = 'language';
  protected static prefixURI:string = 'projects/{!:project_id}/languages/{:id}';
  protected static elementClass: Object = Language;

  system_languages(params: StandartParams): Promise<any> {
    return this.createPromise('GET', params, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
  }

  create(raw_body, params: StandartParams = {}): Promise<any> {
    const body = {"languages": raw_body};
    return this.createPromise('POST', params, this.populateArrayFromJson, this.handleReject, body);
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}
