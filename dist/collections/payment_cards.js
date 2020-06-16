"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCards = void 0;
const payment_card_1 = require("../models/payment_card");
const base_collection_1 = require("./base_collection");
class PaymentCards extends base_collection_1.BaseCollection {
}
exports.PaymentCards = PaymentCards;
PaymentCards.rootElementName = "payment_cards";
PaymentCards.rootElementNameSingular = "payment_card";
PaymentCards.prefixURI = "payment_cards/{:id}";
PaymentCards.elementClass = payment_card_1.PaymentCard;
//# sourceMappingURL=payment_cards.js.map