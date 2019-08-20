export interface Webhook {
  webhook_id: number;
  url: string;
  secret: string;
  events: string[];
  event_lang_map: object;
}