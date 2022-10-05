import { BaseModel } from "./base_model.js";
import { Screenshot as ScreenshotInterface } from "../interfaces/screenshot.js";

export class Screenshot extends BaseModel implements ScreenshotInterface {
  declare screenshot_id: number;
  declare key_ids: number[];
  declare keys: Array<{
    key_id: number;
    coordinates: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  }>;
  declare url: string;
  declare title: string;
  declare description: string;
  declare screenshot_tags: string[];
  declare width: number;
  declare height: number;
  declare created_at: string;
  declare created_at_timestamp: number;
}
