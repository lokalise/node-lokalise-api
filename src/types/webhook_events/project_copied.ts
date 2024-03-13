export type WebhookProjectCopied = {
  event: "project.copied";
  action: string;
  project: {
    id: string;
    name: string;
  };
  new_project: {
    id: string;
    name: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
