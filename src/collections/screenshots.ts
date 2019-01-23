import { BaseCollection } from './base_collection';
import { Screenshot } from '../models/screenshot';

export class Screenshots extends BaseCollection {
  protected static rootElementName:string = 'screenshots';
  protected static prefixURI:string = 'projects/{!:project_id}/screenshots/{:id}';
  protected static elementClass: Object = Screenshot;
}