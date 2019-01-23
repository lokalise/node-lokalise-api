import { BaseCollection } from './base_collection';
import { Snapshot } from '../models/snapshot';

export class Snapshots extends BaseCollection {
  protected static rootElementName:string = 'snapshot';
  protected static prefixURI:string = 'projects/{!:project_id}/snapshots/{:id}';
}
