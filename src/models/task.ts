import { BaseModel } from './base_model';
import { Task as TaskInterface } from "../interfaces";

export class Task extends BaseModel implements TaskInterface {
  public task_id: number;
  public title: string;
  public description: string;
  public status: string;
  public progress: number;
  public due_date: string;
  public due_date_timestamp: number;
  public keys_count: number;
  public words_count: number;
  public created_at: string;
  public created_at_timestamp: number;
  public created_by: number;
  public created_by_email: string;
  public can_be_parent: boolean;
  public task_type: string;
  public parent_task_id: number;
  public closing_tags: string[];
  public do_lock_translations: boolean;
  public languages: object;
  public auto_close_languages: boolean;
  public auto_close_task: boolean;
  public completed_at: string;
  public completed_at_timestamp: number;
  public completed_by: number;
  public completed_by_email: string;
  public custom_translation_status_ids: number[];
}
