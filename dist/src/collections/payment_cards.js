import { PaymentCard } from "../models/payment_card";
import { BaseCollection } from "./base_collection";
export class PaymentCards extends BaseCollection {
}
PaymentCards.rootElementName = "payment_cards";
PaymentCards.rootElementNameSingular = "payment_card";
PaymentCards.prefixURI = "payment_cards/{:id}";
PaymentCards.elementClass = PaymentCard;
//# sourceMappingURL=payment_cards.js.map