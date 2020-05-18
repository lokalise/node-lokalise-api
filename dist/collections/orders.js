"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const order_1 = require("../models/order");
const base_collection_1 = require("./base_collection");
let Orders = /** @class */ (() => {
    class Orders extends base_collection_1.BaseCollection {
    }
    Orders.rootElementName = "orders";
    Orders.prefixURI = "teams/{!:team_id}/orders/{:id}";
    Orders.elementClass = order_1.Order;
    return Orders;
})();
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map