export type WebhookProjectTaskQueued = {
  event: "project.task.queued";
  task: {
    id: number;
    type: string;
    title: string;
    due_date: string;
    description: string;
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
