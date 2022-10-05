import { BaseModel } from "./base_model.js";
import { File as FileInterface } from "../interfaces/file.js";

export class File extends BaseModel implements FileInterface {
  declare file_id: number;
  declare filename: string;
  declare key_count: number;
}
