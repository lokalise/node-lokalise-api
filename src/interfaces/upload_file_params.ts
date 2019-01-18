export interface UploadFileParams {
  data: string;
  filename: string;
  lang_iso: string; 
  convert_placeholder?: string;
  detect_icu_plurals?: boolean;
  tags?: any[];
  replace_modified?: boolean; 
  slashn_to_linebreak?: boolean;
  keys_to_values?: boolean;
  apply_tm?: boolean;
  hidden_from_contributors?: boolean;
  cleanup_mode?: boolean;
}