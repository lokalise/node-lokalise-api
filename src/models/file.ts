import { BaseModel } from "./base_model";
import { File as FileInterface } from "../interfaces/file";

export class File extends BaseModel implements FileInterface {
  declare file_id: number;
  declare filename: string;
  declare key_count: number;
}
