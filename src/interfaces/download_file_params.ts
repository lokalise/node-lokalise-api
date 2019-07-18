export interface DownloadFileParams {
  format: string;
  original_filenames?: boolean;
  bundle_structure?: string;
  directory_prefix?: string;
  all_platforms?: boolean
  filter_langs?: any[];
  filter_data?: any[];
  filter_filenames?: any[];
  add_newline_eof?: boolean;
  custom_translation_status_ids?: any[];
  include_tags?: any[];
  exclude_tags?: any[];
  export_sort?: string;
  export_empty_as?: string;
  include_comments?: boolean;
  include_description?: boolean;
  include_pids? : any[];
  triggers?: string[];
  filter_repositories?: any[];
  replace_breaks?: boolean;
  disable_references?: boolean;
  plural_format?: string[];
  placeholder_format?: string;
  webhook_url?: string;
  language_mapping?: object;
  icu_numeric?: boolean;
  escape_percent?: boolean;
  indentation?: string;
  yaml_include_root?: boolean;
  json_unescaped_slashes?: boolean;
  java_properties_encoding?: string;
  java_properties_separator?: string;
  bundle_description?: string;
}