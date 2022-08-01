import { BaseCollection } from "./base_collection";
import { File } from "../models/file";
import { QueuedProcess } from "../models/queued_process";
import { UploadFileParams } from "../interfaces/upload_file_params";
import { DownloadFileParams } from "../interfaces/download_file_params";
import { Keyable } from "../interfaces/keyable";
import { ProjectWithPagination } from "../interfaces/project_with_pagination";
import { PaginatedResult } from "../interfaces/paginated_result";
import { ProjectOnly } from "../interfaces/project_only";

interface ListFileParams extends ProjectWithPagination {
  filter_filename?: string;
}

type FileDeleted = {
  project_id: string;
  file_deleted: boolean;
};

export class Files extends BaseCollection {
  protected static rootElementName = "files";
  protected static prefixURI = "projects/{!:project_id}/files/{:id}";
  protected static elementClass = File;

  protected static secondaryElementNameSingular = "process";
  protected static secondaryElementClass = QueuedProcess;

  list(request_params: ListFileParams): Promise<PaginatedResult<File>> {
    return this.doList(request_params);
  }

  upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess> {
    return this.createPromise(
      "POST",
      { project_id: project_id },
      this.populateSecondaryObjectFromJsonRoot,
      this.handleReject,
      upload,
      "projects/{!:project_id}/files/upload"
    );
  }

  download(project_id: string, download: DownloadFileParams): Promise<Keyable> {
    return this.createPromise(
      "POST",
      { project_id: project_id },
      this.returnBareJSON,
      this.handleReject,
      download,
      "projects/{!:project_id}/files/download"
    );
  }

  delete(
    file_id: string | number,
    request_params: ProjectOnly
  ): Promise<FileDeleted> {
    return this.doDelete(file_id, request_params);
  }
}
