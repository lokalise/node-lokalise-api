import { Filenames } from "../filenames.js";

export type WebhookProjectKeyCommentAdded = {
  event: "project.key.comment.added";
  comment: {
    value: string;
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
