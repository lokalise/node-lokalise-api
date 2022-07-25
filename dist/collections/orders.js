import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
export class Orders extends BaseCollection {
    static rootElementName = "orders";
    static prefixURI = "teams/{!:team_id}/orders/{:id}";
    static elementClass = Order;
}
//# sourceMappingURL=orders.js.map