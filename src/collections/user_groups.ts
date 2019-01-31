import { BaseCollection } from './base_collection';
import { UserGroup } from '../models/user_group';
import { StandartParams } from '../interfaces/standart_params';

export class UserGroups extends BaseCollection {
  protected static rootElementName:string = 'user_groups';
  protected static prefixURI:string = 'teams/{!:team_id}/groups/{:id}';
  protected static elementClass: Object = UserGroup;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJson, this.handleReject, body);
  }

  add_project_to_group(team_id, group_id, body, params) {
    params = {}
    params['team_id'] = team_id;
    params['group_id'] = group_id;
    return this.createPromise('PUT', params, this.returnBareJSON, this.handleReject, body, 
                              'teams/{!:team_id}/groups/{!:group_id}/projects/add' )
  }

  remove_project_from_group(team_id, group_id, body, params) {
    params = {}
    params['team_id'] = team_id;
    params['group_id'] = group_id;
    return this.createPromise('PUT', params, this.returnBareJSON, this.handleReject, body, 
                              'teams/{!:team_id}/groups/{!:group_id}/projects/remove' )
  }
}
