import type { Task as TaskInterface } from "../interfaces/task.js";
import { BaseModel } from "./base_model.js";

export class Task extends BaseModel implements TaskInterface {
	declare task_id: number;
	declare title: string;
	declare description: string;
	declare status: string;
	declare progress: number;
	declare due_date: string;
	declare due_date_timestamp: number;
	declare keys_count: number;
	declare words_count: number;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare created_by: number;
	declare created_by_email: string;
	declare can_be_parent: boolean;
	declare task_type: string;
	declare parent_task_id: number;
	declare closing_tags: string[];
	declare do_lock_translations: boolean;
	declare languages: Array<{
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
		tm_leverage: {
			status: string;
			value: {
				"0%+": number;
				"50%+": number;
				"75%+": number;
				"85%+": number;
				"95%+": number;
				"100%": number;
			};
		};
		keys_count: number;
		words_count: number;
		completed_at: string;
		completed_at_timestamp: number;
		completed_by: number;
		completed_by_email: string;
	}>;
	declare source_language_iso: string;
	declare auto_close_languages: boolean;
	declare auto_close_task: boolean;
	declare auto_close_items: boolean;
	declare completed_at: string;
	declare completed_at_timestamp: number;
	declare completed_by: number;
	declare completed_by_email: string;
	declare custom_translation_status_ids: number[];
}
