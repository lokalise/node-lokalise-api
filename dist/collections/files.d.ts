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
export declare class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: typeof File;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: typeof QueuedProcess;
    list(request_params: ListFileParams): Promise<PaginatedResult<File>>;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<Keyable>;
    delete(file_id: string | number, request_params: ProjectOnly): Promise<FileDeleted>;
}
export {};
