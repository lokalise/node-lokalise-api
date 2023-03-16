import { PaymentCard } from "../models/payment_card.js";
import { BaseCollection } from "./base_collection.js";
class PaymentCards extends BaseCollection {
    static rootElementName = "payment_cards";
    static rootElementNameSingular = "payment_card";
    static prefixURI = "payment_cards/{:id}";
    static elementClass = PaymentCard;
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
export { PaymentCards };
//# sourceMappingURL=payment_cards.js.map