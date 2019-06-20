import { BaseCollection } from './base_collection';
import { TeamUser } from '../models/team_user';
import {StandartParams} from "../interfaces/standart_params";

export class TeamUsers extends BaseCollection {
  protected static rootElementName:string = 'team_users';
  protected static rootElementNameSingular: string = 'team_user';
  protected static prefixURI:string = 'teams/{!:team_id}/users/{:id}';
  protected static elementClass: Object = TeamUser;

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}