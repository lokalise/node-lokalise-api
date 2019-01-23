import { BaseCollection } from './base_collection';

export class Translations extends BaseCollection {
  protected static rootElementName:string = 'translations';
  protected static prefixURI:string = 'projects/{!:project_id}/translations/{:id}';
}
