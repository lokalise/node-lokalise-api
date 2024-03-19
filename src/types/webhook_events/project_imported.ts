export type WebhookProjectImported = {
  event: "project.imported";
  import: {
    filename: string;
    format: string;
    inserted: number;
    updated: number;
    skipped: number;
  };
  project: {
    id: string;
    name: string;
    branch?: string;
  };
  import_options: {
    replace_line_breaks: boolean;
    convert_placeholders: boolean;
    replace_modified: boolean;
    key_tags: string[];
    tag_keys_inserted: boolean;
    tag_keys_updated: boolean;
    tag_keys_skipped: boolean;
    detect_icu_plurals: boolean;
    fill_empty_with_keys: boolean;
    hide_from_contributors: boolean;
    diff_by_file: boolean;
    use_tm: boolean;
    cleanup: boolean;
  };
  language: {
    id: number;
    iso: string;
    name: string;
  };
  user: {
    email: string;
    full_name: string;
  };
  created_at: string;
  created_at_timestamp: number;
};
