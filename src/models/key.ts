import { Key as KeyInterface } from "../interfaces/key";
import { BaseModel } from "./base_model";
import { Filenames } from "../types/filenames";
import { SupportedPlatforms } from "../types/supported_platforms";
import { Filenames as Keynames } from "../types/filenames";
import { Comment } from "../interfaces/comment";
import { Screenshot } from "../interfaces/screenshot";
import { Translation } from "../interfaces/translation";

type KeyComment = Omit<Comment, "key_id">;

export class Key extends BaseModel implements KeyInterface {
  declare key_id: number;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare key_name: Keynames;
  declare filenames: Filenames;
  declare description: string;
  declare platforms: SupportedPlatforms[];
  declare tags: string[];
  declare comments: KeyComment[];
  declare screenshots: Screenshot[];
  declare translations: Translation[];
  declare is_plural: boolean;
  declare plural_name: string;
  declare is_hidden: boolean;
  declare is_archived: boolean;
  declare context: string;
  declare base_words: number;
  declare char_limit: number;
  declare custom_attributes: any[] | string;
  declare modified_at: string;
  declare modified_at_timestamp: number;
  declare translations_modified_at: string;
  declare translations_modified_at_timestamp: number;
}
