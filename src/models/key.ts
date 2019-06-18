import { Key as KeyInterface } from "../interfaces";
import { BaseModel } from './base_model';

export class Key extends BaseModel implements KeyInterface {
  public key_id: number;
  public created_at: string;
  public created_at_timestamp: number;
  public key_name: object;
  public filenames: object;
  public description: string;
  public platforms: string[];
  public tags: string[];
  public comments: object;
  public screenshots: object;
  public translations: object|object[];
  public is_plural: boolean;
  public plural_name: string;
  public is_hidden: boolean;
  public is_archived: boolean;
  public context: string;
  public base_words: number;
  public char_limit: number;
  public custom_attributes: any[];
}
