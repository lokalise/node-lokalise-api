export type WebhookProjectTranslationUpdated = {
  event: "project.translation.updated";
  translation: {
    id: number;
    value: string;
    previous_value: string;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  key: {
    id: number;
    name: string;
  };
  project: {
    id: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
