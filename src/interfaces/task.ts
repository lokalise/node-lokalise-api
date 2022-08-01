export interface Task {
  task_id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  due_date: string;
  due_date_timestamp: number;
  keys_count: number;
  words_count: number;
  created_at: string;
  created_at_timestamp: number;
  created_by: number;
  created_by_email: string;
  can_be_parent: boolean;
  task_type: string;
  parent_task_id: number;
  closing_tags: string[];
  do_lock_translations: boolean;
  languages: Array<{
    language_iso: string;
    users: Array<{
      user_id: string | number;
      email: string;
      fullname: string;
    }>;
    groups: Array<{
      id: string | number;
      name: string;
    }>;
    keys: string[] | number[];
    status: string;
    progress: number;
    initial_tm_leverage: {
      "0%+": number;
      "60%+": number;
      "75%+": number;
      "95%+": number;
      "100%": number;
    };
    keys_count: number;
    words_count: number;
    completed_at: string;
    completed_at_timestamp: number;
    completed_by: number;
    completed_by_email: string;
  }>;
  source_language_iso: string;
  auto_close_languages: boolean;
  auto_close_task: boolean;
  auto_close_items: boolean;
  completed_at: string;
  completed_at_timestamp: number;
  completed_by: number;
  completed_by_email: string;
  custom_translation_status_ids: number[];
}
