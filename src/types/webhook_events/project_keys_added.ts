export type WebhookProjectKeysAdded = {
  event: "project.keys.added";
  keys: Array<{
    id: number;
    name: string;
    base_value: string;
    tags: string[];
  }>;
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
