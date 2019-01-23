import { BaseCollection } from './base_collection';
import { UserGroup } from '../models/user_group';

export class UserGroups extends BaseCollection {
  protected static rootElementName:string = 'user_groups';
  protected static prefixURI:string = 'teams/{!:team_id}/groups/{:id}';
  protected static elementClass: Object = UserGroup;
}
