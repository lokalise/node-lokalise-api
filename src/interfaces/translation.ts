export interface Translation {
  translation_id: number;
  key_id: number;
  language_iso: string;
  modified_at: string;
  modified_at_timestamp: number;
  modified_by: number;
  modified_by_email: string;
  translation: string;
  is_fuzzy: boolean;
  is_reviewed: boolean;
  reviewed_by: number;
  words: number;
  custom_translation_statuses: object[];
}