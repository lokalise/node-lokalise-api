import { PaymentCard } from "../models/payment_card.js";
import { BaseCollection } from "./base_collection.js";
export class PaymentCards extends BaseCollection {
    static rootElementName = "payment_cards";
    static rootElementNameSingular = "payment_card";
    static prefixURI = "payment_cards/{:id}";
    static elementClass = PaymentCard;
}
//# sourceMappingURL=payment_cards.js.map