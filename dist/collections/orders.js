import { Order } from "../models/order.js";
import { BaseCollection } from "./base_collection.js";
class Orders extends BaseCollection {
    static rootElementName = "orders";
    static prefixURI = "teams/{!:team_id}/orders/{:id}";
    static elementClass = Order;
    list(request_params) {
        return this.doList(request_params);
    }
    create(order_params, request_params) {
        return this.doCreate(order_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(order_id, request_params) {
        return this.doGet(order_id, request_params);
    }
}
export { Orders };
//# sourceMappingURL=orders.js.map