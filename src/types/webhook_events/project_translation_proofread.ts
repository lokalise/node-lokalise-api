import { Filenames } from "../filenames.js";

export type WebhookProjectTranslationProofread = {
  event: "project.translation.proofread";
  translation: {
    id: number;
    value: string;
    is_proofread: boolean;
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
