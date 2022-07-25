import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";

export class Orders extends BaseCollection {
  protected static rootElementName = "orders";
  protected static prefixURI = "teams/{!:team_id}/orders/{:id}";
  protected static elementClass = Order;
}
