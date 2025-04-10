import type { Comment } from "../interfaces/comment.js";
import type { Key as KeyInterface } from "../interfaces/key.js";
import type { Screenshot } from "../interfaces/screenshot.js";
import type { Translation } from "../interfaces/translation.js";
import type { Filenames, Filenames as Keynames } from "../types/filenames.js";
import type { SupportedPlatforms } from "../types/supported_platforms.js";
import { BaseModel } from "./base_model.js";

type KeyComment = Omit<Comment, "key_id">;

export class Key extends BaseModel implements KeyInterface {
	declare key_id: number;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare key_name: Keynames;
	declare filenames: Filenames;
	declare description: string;
	declare platforms: SupportedPlatforms[];
	declare tags: string[];
	declare comments: KeyComment[];
	declare screenshots: Screenshot[];
	declare translations: Translation[];
	declare is_plural: boolean;
	declare plural_name: string;
	declare is_hidden: boolean;
	declare is_archived: boolean;
	declare context: string;
	declare base_words: number;
	declare char_limit: number;
	declare custom_attributes: string;
	declare modified_at: string;
	declare modified_at_timestamp: number;
	declare translations_modified_at: string;
	declare translations_modified_at_timestamp: number;
}
