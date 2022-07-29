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
    list(request_params = {}) {
        return this.doList(request_params);
    }
    create(card_params) {
        return this.doCreate(card_params);
    }
    get(card_id) {
        return this.doGet(card_id);
    }
    delete(card_id) {
        return this.doDelete(card_id);
    }
}
exports.PaymentCards = PaymentCards;
//# sourceMappingURL=payment_cards.js.map