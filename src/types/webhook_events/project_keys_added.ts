import { Filenames } from "../filenames.js";

export type WebhookProjectKeysAdded = {
  event: "project.keys.added";
  action?: "string";
  keys: Array<{
    id: number;
    name: string;
    base_value: string;
    tags: string[];
    filenames: Filenames;
    previous_name?: string | null;
    hidden: boolean;
    screenshots: string[] | number[];
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
