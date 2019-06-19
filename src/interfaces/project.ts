export interface Project {
  project_id: string;
  project_type: string;
  name: string;
  description: string;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  team_id: number;
  base_language_id: number;
  base_language_iso: string;
  settings: object;
  statistics: object;
}
