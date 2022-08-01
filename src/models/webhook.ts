import { BaseModel } from "./base_model";
import { Webhook as WebhookInterface } from "../interfaces/webhook";

export class Webhook extends BaseModel implements WebhookInterface {
  declare webhook_id: string;
  declare branch: string;
  declare url: string;
  declare secret: string;
  declare events: string[];
  declare event_lang_map: Array<{
    event: string;
    lang_iso_codes: string[];
  }>;
}
