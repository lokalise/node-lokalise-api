import { PaymentCard } from '../models/payment_card';
import { BaseCollection } from './base_collection';

export class PaymentCards extends BaseCollection {
  protected static rootElementName: string = 'payment_cards';
  protected static rootElementNameSingular: string = 'payment_card';
  protected static prefixURI: string = 'payment_cards/{:id}';
  protected static elementClass: Object = PaymentCard;
}