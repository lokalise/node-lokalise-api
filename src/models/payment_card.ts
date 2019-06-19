import { PaymentCard as PaymentCardInterface } from "../interfaces";
import { BaseModel } from './base_model';

export class PaymentCard extends BaseModel implements PaymentCardInterface {
  public card_id: number;
  public last4: string;
  public brand: string;
  public created_at: string;
  public created_at_timestamp: number;
}