"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const order_1 = require("../models/order");
const base_collection_1 = require("./base_collection");
class Orders extends base_collection_1.BaseCollection {
}
exports.Orders = Orders;
Orders.rootElementName = "orders";
Orders.prefixURI = "teams/{!:team_id}/orders/{:id}";
Orders.elementClass = order_1.Order;
//# sourceMappingURL=orders.js.map