import { BaseCollection } from './base_collection';
import { Webhook } from '../models/webhook';
import {StandartParams} from "../interfaces/standart_params";

export class Webhooks extends BaseCollection {
  protected static rootElementName: string = 'webhooks';
  protected static rootElementNameSingular: string = 'webhook';
  protected static prefixURI: string = 'projects/{!:project_id}/webhooks/{:id}';
  protected static elementClass: Object = Webhook;

  create(body, params: StandartParams = {}): Promise<any> {
    return this.createPromise('POST', params, this.populateObjectFromJsonRoot,
      this.handleReject, body);
  }

  update(id, body, params : StandartParams = {}) : Promise<any> {
    params['id'] = id;
    return this.createPromise('PUT', params, this.populateObjectFromJsonRoot, this.handleReject, body);
  }
}