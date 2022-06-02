"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCards = void 0;
const payment_card_1 = require("../models/payment_card");
const base_collection_1 = require("./base_collection");
class PaymentCards extends base_collection_1.BaseCollection {
    static rootElementName = "payment_cards";
    static rootElementNameSingular = "payment_card";
    static prefixURI = "payment_cards/{:id}";
    static elementClass = payment_card_1.PaymentCard;
}
exports.PaymentCards = PaymentCards;
//# sourceMappingURL=payment_cards.js.map