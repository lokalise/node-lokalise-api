import { BaseModel } from './base_model';
import { FileParams } from '../interfaces/file_params';
import { UploadFileParams } from '../interfaces/upload_file_params';
import { DownloadFileParams } from '../interfaces/download_file_params';

export class File extends BaseModel {
  public filename: string;
  public key_count: number;
}
