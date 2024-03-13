export type WebhookProjectKeyCommentAdded = {
  event: "project.key.comment.added";
  comment: {
    value: string;
  };
  key: {
    id: number;
    name: string;
    filenames: {
      android: string | null;
      ios: string | null;
      other: string | null;
      web: string | null;
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
