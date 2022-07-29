"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const order_1 = require("../models/order");
const base_collection_1 = require("./base_collection");
class Orders extends base_collection_1.BaseCollection {
    static rootElementName = "orders";
    static prefixURI = "teams/{!:team_id}/orders/{:id}";
    static elementClass = order_1.Order;
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
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map