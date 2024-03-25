import type { Filenames } from "../filenames.js";

export type WebhookProjectKeysDeleted = {
  event: "project.keys.deleted";
  action?: string;
  keys: Array<{
    id: number;
    name: string;
    base_value: string;
    filenames: Filenames;
  }>;
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
