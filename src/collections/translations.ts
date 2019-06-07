import { BaseCollection } from './base_collection';
import { Translation } from '../models/translation';

export class Translations extends BaseCollection {
  protected static rootElementName:string = 'translations';
  protected static prefixURI:string = 'projects/{!:project_id}/translations/{:id}';
  protected static elementClass: Object = Translation;
}
