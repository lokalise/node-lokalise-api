import { BaseModel } from './base_model';

export class Screenshot extends BaseModel {
  public screenshot_id: number;
  public key_ids: string[];
  public url: string;
  public title: string;
  public description: string;
  public screenshot_tags: string[];
  public width: number;
  public height: number;
}