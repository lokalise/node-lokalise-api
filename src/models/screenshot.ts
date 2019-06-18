import { BaseModel } from './base_model';
import { Screenshot as ScreenshotInterface } from "../interfaces";

export class Screenshot extends BaseModel implements ScreenshotInterface {
  public screenshot_id: number;
  public key_ids: number[];
  public url: string;
  public title: string;
  public description: string;
  public screenshot_tags: string[];
  public width: number;
  public height: number;
  public created_at: string;
  public created_at_timestamp: number;
}