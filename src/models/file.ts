import { BaseModel } from './base_model';
import { FileParams } from '../interfaces/file_params';
import { UploadFileParams } from '../interfaces/upload_file_params';
import { DownloadFileParams } from '../interfaces/download_file_params';
import { File as FileInterface } from "../interfaces";

export class File extends BaseModel implements FileInterface {
  public filename: string;
  public key_count: number;
}
