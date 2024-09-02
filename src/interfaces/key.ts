import type { Comment } from "../interfaces/comment.js";
import type { Screenshot } from "../interfaces/screenshot.js";
import type { Translation } from "../interfaces/translation.js";
import type { Filenames, Filenames as Keynames } from "../types/filenames.js";
import type { SupportedPlatforms } from "../types/supported_platforms.js";

type KeyComment = Omit<Comment, "key_id">;

export interface Key {
	key_id: number;
	created_at: string;
	created_at_timestamp: number;
	key_name: Keynames;
	filenames: Filenames;
	description: string;
	platforms: SupportedPlatforms[];
	tags: string[];
	comments: KeyComment[];
	screenshots: Screenshot[];
	translations: Translation[];
	is_plural: boolean;
	plural_name: string;
	is_hidden: boolean;
	is_archived: boolean;
	context: string;
	base_words: number;
	char_limit: number;
	custom_attributes: any[] | string;
	modified_at: string;
	modified_at_timestamp: number;
	translations_modified_at: string;
	translations_modified_at_timestamp: number;
}
