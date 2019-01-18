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

  upload(project_id: string, upload: UploadFileParams) {
    return this.createPromise('POST', { project_id: project_id}, this.returnBareJSON, this.handleReject, 
                       upload, 'projects/{!:project_id}/files/upload');
  }

  download(download: DownloadFileParams) {
    return this.createPromise('POST', {id: 'upload'}, this.returnBareJSON, this.handleReject, 
                       download, 'projects/{!:project_id}/files/download');
  }
}
