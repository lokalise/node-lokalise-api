import { BaseModel } from "./base_model.js";
import {
  Webhook as WebhookInterface,
  EventLangMap,
} from "../interfaces/webhook.js";

export class Webhook extends BaseModel implements WebhookInterface {
  declare webhook_id: string;
  declare url: string;
  declare secret: string;
  declare events: string[];
  declare event_lang_map: EventLangMap[];
}
