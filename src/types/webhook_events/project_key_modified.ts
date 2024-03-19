import { Filenames } from "../filenames.js";

export type WebhookProjectKeyModified = {
  event: "project.key.modified";
  key: {
    id: number;
    name: string;
    previous_name?: string | null;
    tags: string[];
    filenames: Filenames;
    hidden: boolean;
    screenshots: string[] | number[];
  };
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
