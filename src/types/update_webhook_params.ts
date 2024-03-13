import { CreateWebhookParams } from "./create_webhook_params.js";

export type UpdateWebhookParams = Omit<
  CreateWebhookParams,
  "url" | "events"
> & {
  url?: string;
  events?: string[];
};
