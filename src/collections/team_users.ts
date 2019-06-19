import { BaseCollection } from './base_collection';
import { TeamUser } from '../models/team_user';

export class TeamUsers extends BaseCollection {
  protected static rootElementName:string = 'team_users';
  protected static prefixURI:string = 'teams/{!:team_id}/users/{:id}';
  protected static elementClass: Object = TeamUser;
}
