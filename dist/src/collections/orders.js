import { Order } from "../models/order";
import { BaseCollection } from "./base_collection";
export class Orders extends BaseCollection {
}
Orders.rootElementName = "orders";
Orders.prefixURI = "teams/{!:team_id}/orders/{:id}";
Orders.elementClass = Order;
//# sourceMappingURL=orders.js.map