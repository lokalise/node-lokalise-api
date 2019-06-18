export interface UserGroup {
  group_id: number;
  name: string;
  permissions: object;
  created_at: string;
  created_at_timestamp: number;
  team_id: number;
  projects: object[];
  members: number[];
}