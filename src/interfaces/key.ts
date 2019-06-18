export interface Key {
  key_id: number;
  created_at: string;
  created_at_timestamp: number;
  key_name: object;
  filenames: object;
  description: string;
  platforms: string[];
  tags: string[];
  comments: object;
  screenshots: object;
  translations: object|object[];
  is_plural: boolean;
  plural_name: string;
  is_hidden: boolean;
  is_archived: boolean;
  context: string;
  base_words: number;
  char_limit: number;
  custom_attributes: any[];
}