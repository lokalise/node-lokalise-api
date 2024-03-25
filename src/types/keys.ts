import type { SupportedPlatforms } from "./supported_platforms.js";
import type { Filenames, Filenames as Keynames } from "./filenames.js";
import type { CommentData } from "./comments.js";
import type { ScreenshotData } from "./screenshots.js";
import type { TranslationData } from "./translations.js";
import type {
  ProjectWithPagination,
  ProjectOnly,
} from "./common_get_params.js";
import type { NumericBool } from "./numeric_bool.js";

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

export type CreateKeyParams = {
  keys?: CreateKeyData[];
  use_automations?: boolean;
};

export type UpdateKeyData = Omit<CreateKeyData, "key_name" | "platforms"> & {
  key_name?: string | Keynames;
  merge_tags?: boolean;
  platforms?: SupportedPlatforms[];
};

export type BulkUpdateKeyParams = {
  keys?: UpdateKeyDataWithId[];
  use_automations?: boolean;
};

export type UpdateKeyDataWithId = UpdateKeyData & {
  key_id: string | number;
};

export type KeyDeleted = {
  project_id: string;
  key_removed: boolean;
  keys_locked?: number;
  branch?: string;
};

export type KeysBulkDeleted = {
  project_id: string;
  keys_removed: boolean;
  keys_locked: number;
  branch?: string;
};

export type KeyParamsWithPagination = ProjectWithPagination & {
  disable_references?: NumericBool;
  include_comments?: NumericBool;
  include_screenshots?: NumericBool;
  include_translations?: NumericBool;
  filter_translation_lang_ids?: string;
  filter_tags?: string;
  filter_filenames?: string;
  filter_keys?: string;
  filter_key_ids?: string;
  filter_platforms?: string;
  filter_untranslated?: NumericBool;
  filter_qa_issues?: string;
  filter_archived?: string;
};

export type GetKeyParams = ProjectOnly & {
  disable_references?: NumericBool;
};
