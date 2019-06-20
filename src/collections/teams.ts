import { BaseCollection } from './base_collection';
import { Team } from '../models/team';

export class Teams extends BaseCollection {
  protected static rootElementName:string = 'teams';
  protected static prefixURI:string = 'teams';
  protected static elementClass: Object = Team;
}
