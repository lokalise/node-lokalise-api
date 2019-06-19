"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const base_collection_1 = require("./base_collection");
class Orders extends base_collection_1.BaseCollection {
}
Orders.rootElementName = 'orders';
Orders.prefixURI = 'teams/{!:team_id}/orders/{:id}';
Orders.elementClass = order_1.Order;
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map