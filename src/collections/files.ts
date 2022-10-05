import { BaseCollection } from "./base_collection.js";
import { File } from "../models/file.js";
import { QueuedProcess } from "../models/queued_process.js";
import { UploadFileParams } from "../interfaces/upload_file_params.js";
import { DownloadFileParams } from "../interfaces/download_file_params.js";
import { Keyable } from "../interfaces/keyable.js";
import { ProjectWithPagination } from "../interfaces/project_with_pagination.js";
import { PaginatedResult } from "../interfaces/paginated_result.js";
import { ProjectOnly } from "../interfaces/project_only.js";

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
