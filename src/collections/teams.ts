import { BaseCollection } from './base_collection';
import { Team } from '../models/team';

export class Teams extends BaseCollection {
  protected static rootElementName:string = 'tasks';
  protected static prefixURI:string = 'teams/{:id}';
  protected static elementClass: Object = Team;
}
