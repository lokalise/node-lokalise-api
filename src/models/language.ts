import * as Interfaces from '../interfaces/index';
import { BaseModel } from './base_model';
import { ApiRequest } from '../http_client/base';

export class Language extends BaseModel {
  protected static rootElementName:string = 'projects';
  protected static prefixURI:string = 'projects/{!:project_id}/languages/{:id}';

  public lang_id: number;
  public lang_iso: string;
  public lang_name: string;
  public is_rtl: boolean;
  public plural_forms: string[];

  system_languages() {
    this.createPromise('GET', {}, this.populateArrayFromJson, this.handleReject, null, 'system/languages');
  }
}
