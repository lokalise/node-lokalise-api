export type WebhookTeamOrderCreated = {
  event: "team.order.created";
  project: {
    id: string;
    name: string;
  };
  order: {
    id: string;
    provider: string;
    currency: string;
    total: string | number;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
