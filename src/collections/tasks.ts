import { BaseCollection } from './base_collection';
import { Task } from '../models/task';
import {StandartParams} from "../interfaces/standart_params";

export class Tasks extends BaseCollection {
  protected static rootElementName:string = 'tasks';
  protected static rootElementNameSingular: string = 'task';
  protected static prefixURI:string = 'projects/{!:project_id}/tasks/{:id}';
  protected static elementClass: Object = Task;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}
