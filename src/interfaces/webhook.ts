export type EventLangMap = {
  event: string;
  lang_iso_codes: string[];
};

export interface Webhook {
  webhook_id: string;
  url: string;
  secret: string;
  events: string[];
  event_lang_map: EventLangMap[];
}
