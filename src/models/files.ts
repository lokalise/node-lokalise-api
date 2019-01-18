import { BaseModel } from './base_model';
import { FileParams } from '../interfaces/file_params';
import { UploadFileParams } from '../interfaces/upload_file_params';
import { DownloadFileParams } from '../interfaces/download_file_params';

export class Files extends BaseModel {
  protected static rootElementName:string = 'files';
  protected static prefixURI:string = 'projects/{!:project_id}/files/{:id}';
  public filename: string;
  public key_count: number;

  list(params: FileParams = {}) : Promise<this[]> {
    return super.list(params);
  }

  upload(upload: UploadFileParams) {
    return super.create(upload, { id: 'upload' });
  }

  download(download: DownloadFileParams) {
    return super.get('download', download);
  }
}
