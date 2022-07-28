"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const order_1 = require("../models/order");
const base_collection_1 = require("./base_collection");
class Orders extends base_collection_1.BaseCollection {
    static rootElementName = "orders";
    static prefixURI = "teams/{!:team_id}/orders/{:id}";
    static elementClass = order_1.Order;
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map