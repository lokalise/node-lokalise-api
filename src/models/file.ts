import { BaseModel } from "./base_model";
import { File as FileInterface } from "../interfaces/file";

export class File extends BaseModel implements FileInterface {
  public filename: string;
  public key_count: number;
}
