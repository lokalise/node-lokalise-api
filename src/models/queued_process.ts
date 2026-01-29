import type { QueuedProcess as QueuedProcessInterface } from "../interfaces/queued_process.js";
import type { QueuedProcessDetails } from "../types/queued_process_details.js";
import { BaseModel } from "./base_model.js";

export class QueuedProcess extends BaseModel implements QueuedProcessInterface {
	declare process_id: string;
	declare type: string;
	declare status: string;
	declare message: string;
	declare created_by: number;
	declare created_by_email: string;
	declare created_at: string;
	declare created_at_timestamp: number;
	declare details: QueuedProcessDetails;
}
