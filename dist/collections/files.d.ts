import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { File } from "../models/file.js";
import { QueuedProcess } from "../models/queued_process.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type { DownloadBundle, DownloadFileParams, FileDeleted, ListFileParams, UploadFileParams } from "../types/files.js";
import { BaseCollection } from "./base_collection.js";
export declare class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof File;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: typeof QueuedProcess;
    list(request_params: ListFileParams): Promise<PaginatedResult<File>>;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<DownloadBundle>;
    delete(file_id: string | number, request_params: ProjectOnly): Promise<FileDeleted>;
}
