import type { PaginatedResult } from "../interfaces/paginated_result.js";
import { File } from "../models/file.js";
import { QueuedProcess } from "../models/queued_process.js";
import type { ProjectOnly } from "../types/common_get_params.js";
import type {
	DownloadBundle,
	DownloadFileParams,
	FileDeleted,
	ListFileParams,
	UploadFileParams,
} from "../types/files.js";
import { BaseCollection } from "./base_collection.js";

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
			"projects/{!:project_id}/files/upload",
		);
	}

	download(
		project_id: string,
		download: DownloadFileParams,
	): Promise<DownloadBundle> {
		return this.createPromise(
			"POST",
			{ project_id: project_id },
			this.returnBareJSON,
			this.handleReject,
			download,
			"projects/{!:project_id}/files/download",
		);
	}

	delete(
		file_id: string | number,
		request_params: ProjectOnly,
	): Promise<FileDeleted> {
		return this.doDelete(file_id, request_params);
	}
}
