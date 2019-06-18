export interface UploadFileParams {
  data: string;
  filename: string;
  lang_iso: string; 
  convert_placeholder?: boolean;
  detect_icu_plurals?: boolean;
  tags?: any[];
  tag_inserted_keys?: boolean;
  tag_updated_keys?: boolean;
  tag_skipped_keys?: boolean;
  replace_modified?: boolean; 
  slashn_to_linebreak?: boolean;
  keys_to_values?: boolean;
  distinguish_by_file?: boolean;
  apply_tm?: boolean;
  hidden_from_contributors?: boolean;
  cleanup_mode?: boolean;
}