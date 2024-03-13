import { CreateScreenshotParams } from "./create_screenshot_params.js";

export type UpdateScreenshotParams = Omit<
  CreateScreenshotParams,
  "data" | "ocr"
>;
