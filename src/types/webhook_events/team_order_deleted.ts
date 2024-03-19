export type WebhookTeamOrderDeleted = {
  event: "team.order.deleted";
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
