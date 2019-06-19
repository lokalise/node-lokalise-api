import { Order } from '../models/order';
import { BaseCollection } from './base_collection';

export class Orders extends BaseCollection {
  protected static rootElementName: string = 'orders';
  protected static prefixURI: string = 'teams/{!:team_id}/orders/{:id}';
  protected static elementClass: Object = Order;
}