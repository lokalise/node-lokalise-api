import { BaseModel } from './base_model';
import { Webhook as WebhookInterface } from "../interfaces";

export class Webhook extends BaseModel implements WebhookInterface {
  public webhook_id: number;
  public url: string;
  public secret: string;
  public events: string[];
  public event_lang_map: object;
}