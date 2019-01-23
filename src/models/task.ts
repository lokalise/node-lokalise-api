import { BaseModel } from './base_model';

export class Task extends BaseModel {
  public  task_id: number;
  public  title: string;
  public  description: string;
  public  status: string;
  public  progress: number;
  public  due_date: string;
  public  keys_count: number;
  public  words_count: number;
  public  created_at: string;
  public  created_by: number;
  public  created_by_email: string;
  public  languages: object;
  public  auto_close_languages: boolean;
  public  auto_close_task: boolean;
  public  completed_at: string;
  public  completed_by: number;
  public  completed_by_email: string;
}
