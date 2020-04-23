export interface Webhook {
  webhook_id: string;
  url: string;
  secret: string;
  events: string[];
  event_lang_map: object;
}
