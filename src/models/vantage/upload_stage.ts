import type {
	UploadStageVantage as IUploadStageVantage,
	StagedUploadFailureVantage,
	StagedUploadSuccessVantage,
} from "../../interfaces/vantage/upload_stage.js";

export class UploadStageVantage implements IUploadStageVantage {
	readonly batchId!: string;
	readonly uploads!: (StagedUploadSuccessVantage | StagedUploadFailureVantage)[];

	constructor(json: Record<string, unknown>) {
		Object.assign(this, json);
	}
}
