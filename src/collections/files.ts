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

export class Files extends BaseCollection<File, QueuedProcess> {
	protected static override prefixURI = "projects/{!:project_id}/files/{:id}";

	protected get elementClass(): new (
		json: Record<string, unknown>,
	) => File {
		return File;
	}

	protected override get rootElementName(): string {
		return "files";
	}

	protected override get secondaryElementClass(): new (
		json: Record<string, unknown>,
	) => QueuedProcess {
		return QueuedProcess;
	}

	protected override get secondaryElementNameSingular(): string {
		return "process";
	}

	protected override returnBareJSON<T>(
		json: Record<string, unknown> | Record<string, unknown>[],
		headers: Headers,
	): T {
		if (this.isResponseTooBig(headers)) {
			console.warn(
				"\x1b[33m\x1b[1mWarning:\x1b[0m Project too big for sync export. Please use our async export lokaliseApi.files().async_download() method.",
			);
		}
		return {
			...super.returnBareJSON<T>(json, headers),
			responseTooBig: this.isResponseTooBig(headers),
		};
	}

	list(request_params: ListFileParams): Promise<PaginatedResult<File>> {
		return this.doList(request_params) as Promise<PaginatedResult<File>>;
	}

	upload(project_id: string, upload: UploadFileParams): Promise<QueuedProcess> {
		return this.createPromise(
			"POST",
			{ project_id },
			this.populateSecondaryObjectFromJsonRoot,
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
			{ project_id },
			this.returnBareJSON<DownloadBundle>,
			download,
			"projects/{!:project_id}/files/download",
		);
	}

	async_download(
		project_id: string,
		download: DownloadFileParams,
	): Promise<QueuedProcess> {
		return this.createPromise(
			"POST",
			{ project_id },
			this.populateSecondaryObjectFromJson,
			download,
			"projects/{!:project_id}/files/async-download",
		);
	}

	delete(
		file_id: string | number,
		request_params: ProjectOnly,
	): Promise<FileDeleted> {
		return this.doDelete(file_id, request_params);
	}
}
