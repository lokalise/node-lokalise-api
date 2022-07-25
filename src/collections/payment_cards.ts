import { PaymentCard } from "../models/payment_card.js";
import { BaseCollection } from "./base_collection.js";

export class PaymentCards extends BaseCollection {
  protected static rootElementName = "payment_cards";
  protected static rootElementNameSingular = "payment_card";
  protected static prefixURI = "payment_cards/{:id}";
  protected static elementClass = PaymentCard;
}
