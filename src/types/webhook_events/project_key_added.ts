export type WebhookProjectKeyAdded = {
  event: "project.key.added";
  key: {
    id: number;
    name: string;
    base_value: string;
    tags: string[];
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
