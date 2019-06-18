export interface Team {
  team_id: number;
  name: string;
  created_at: string;
  created_at_timestamp: number;
  plan: string;
  quota_usage: object;
  quota_allowed: object;
}