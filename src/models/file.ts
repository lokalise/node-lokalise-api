import { BaseModel } from "./base_model";
import { File as FileInterface } from "../interfaces";

export class File extends BaseModel implements FileInterface {
  public filename: string;
  public key_count: number;
}
