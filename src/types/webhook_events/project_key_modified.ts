export type WebhookProjectKeyModified = {
  event: "project.key.modified";
  key: {
    id: number;
    name: string;
    previous_name: string;
    filenames: {
      ios: string | null;
      android: string | null;
      web: string | null;
      other: string | null;
    };
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
