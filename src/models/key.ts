import { Key as KeyInterface } from "../interfaces/key";
import { BaseModel } from "./base_model";

export class Key extends BaseModel implements KeyInterface {
  declare key_id: number;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare key_name: object;
  declare filenames: object;
  declare description: string;
  declare platforms: string[];
  declare tags: string[];
  declare comments: object;
  declare screenshots: object;
  declare translations: object | object[];
  declare is_plural: boolean;
  declare plural_name: string;
  declare is_hidden: boolean;
  declare is_archived: boolean;
  declare context: string;
  declare base_words: number;
  declare char_limit: number;
  declare custom_attributes: any[];
  declare modified_at: string;
  declare modified_at_timestamp: number;
  declare translations_modified_at: string;
  declare translations_modified_at_timestamp: number;
}
