import { BaseCollection } from './base_collection';
import { Contributor } from '../models/contributor';

export class Contributors extends BaseCollection {
  protected static rootElementName:string = 'contributors';
  protected static prefixURI:string = 'projects/{!:project_id}/contributors/{:id}';
  protected static elementClass: Object = Contributor;
}