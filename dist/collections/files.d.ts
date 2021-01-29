import { BaseCollection } from "./base_collection";
import { QueuedProcess } from "../models/queued_process";
import { UploadFileParams } from "../interfaces/upload_file_params";
import { DownloadFileParams } from "../interfaces/download_file_params";
export declare class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: Object;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: Object;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<Object>;
}
