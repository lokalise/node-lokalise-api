export type WebhookProjectExported = {
  event: "project.exported";
  export: {
    type: string;
    filename: string;
    platform: string;
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
