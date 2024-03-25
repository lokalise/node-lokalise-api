import type { Filenames } from "../filenames.js";

export type WebhookProjectTranslationUpdated = {
  event: "project.translation.updated";
  translation: {
    id: number;
    value: string;
    previous_value: string;
    segment?: number;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  key: {
    id: number;
    name: string;
    filenames: Filenames;
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
