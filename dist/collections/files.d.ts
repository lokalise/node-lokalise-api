import { BaseCollection } from "./base_collection.js";
import { QueuedProcess } from "../models/queued_process.js";
import { UploadFileParams } from "../interfaces/upload_file_params.js";
import { DownloadFileParams } from "../interfaces/download_file_params.js";
import { Keyable } from "../interfaces/keyable.js";
export declare class Files extends BaseCollection {
    protected static rootElementName: string;
    protected static prefixURI: string;
    protected static elementClass: object;
    protected static secondaryElementNameSingular: string;
    protected static secondaryElementClass: object;
    upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess>;
    download(project_id: string, download: DownloadFileParams): Promise<Keyable>;
}
