import { LanguageMapping } from "./language_mapping.js";
import type { FileFormat } from "../types/file_format.js";

type FilterData =
  | "translated"
  | "untranslated"
  | "reviewed"
  | "reviewed_only"
  | "last_reviewed_only"
  | "verified"
  | "nonhidden";

type ExportSort = "first_added" | "last_added" | "last_updated" | "a_z" | "z_a";

type ExportEmptyAs = "empty" | "base" | "null" | "skip";

type ExportNullAs = "null" | "empty";

type Trigger =
  | "amazons3"
  | "gcs"
  | "github"
  | "github-enterprise"
  | "gitlab"
  | "bitbucket"
  | "bitbucket-enterprise"
  | "azure";

type PluralFormat =
  | "json_string"
  | "icu"
  | "array"
  | "generic"
  | "symfony"
  | "i18next"
  | "i18next_v4";

type PlaceholderFormat =
  | "printf"
  | "ios"
  | "icu"
  | "net"
  | "symfony"
  | "i18n"
  | "raw";

type Indentation =
  | "default"
  | "1sp"
  | "2sp"
  | "3sp"
  | "4sp"
  | "5sp"
  | "6sp"
  | "7sp"
  | "8sp"
  | "tab";

type JavaPropertiesEncoding = "utf-8" | "latin-1";

export interface DownloadFileParams {
  format: FileFormat;
  original_filenames?: boolean;
  bundle_structure?: string;
  directory_prefix?: string;
  all_platforms?: boolean;
  filter_langs?: string[];
  filter_data?: FilterData[];
  filter_filenames?: string[];
  add_newline_eof?: boolean;
  custom_translation_status_ids?: string[] | number[];
  include_tags?: string[];
  exclude_tags?: string[];
  export_sort?: ExportSort;
  export_empty_as?: ExportEmptyAs;
  export_null_as?: ExportNullAs;
  include_comments?: boolean;
  include_description?: boolean;
  include_pids?: string[];
  triggers?: Trigger[];
  filter_repositories?: string[];
  replace_breaks?: boolean;
  disable_references?: boolean;
  plural_format?: PluralFormat;
  placeholder_format?: PlaceholderFormat;
  webhook_url?: string;
  language_mapping?: LanguageMapping[];
  icu_numeric?: boolean;
  escape_percent?: boolean;
  indentation?: Indentation;
  yaml_include_root?: boolean;
  json_unescaped_slashes?: boolean;
  java_properties_encoding?: JavaPropertiesEncoding;
  java_properties_separator?: string;
  bundle_description?: string;
  filter_task_id?: number;
  compact?: boolean;
}
