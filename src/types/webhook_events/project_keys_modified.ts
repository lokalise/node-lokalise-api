export type WebhookProjectKeysModified = {
  event: "project.keys.modified";
  action: string;
  keys: Array<{
    id: number;
    name: string;
    previous_name: string;
    filenames: {
      ios: string | null;
      android: string | null;
      web: string | null;
      other: string | null;
    };
    tags: string[];
    hidden: boolean;
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
