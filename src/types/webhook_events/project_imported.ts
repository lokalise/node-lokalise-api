export type WebhookProjectImported = {
  event: "project.imported";
  import: {
    filename: string;
    format: string;
    inserted: number;
    updated: number;
    skipped: number;
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
