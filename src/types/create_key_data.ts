import { SupportedPlatforms } from "../types/supported_platforms.js";
import { Filenames, Filenames as Keynames } from "../types/filenames.js";
import { CommentData } from "../types/comment_data.js";
import { ScreenshotData } from "../types/screenshot_data.js";
import { TranslationData } from "../types/translation_data.js";

export type CreateKeyData = {
  key_name: string | Keynames;
  description?: string;
  platforms: SupportedPlatforms[];
  filenames?: Filenames;
  tags?: string[];
  comments?: CommentData[];
  screenshots?: ScreenshotData[];
  translations?: TranslationData[];
  is_plural?: boolean;
  plural_name?: string;
  is_hidden?: boolean;
  is_archived?: boolean;
  context?: string;
  char_limit?: number;
  custom_attributes?: string;
};
