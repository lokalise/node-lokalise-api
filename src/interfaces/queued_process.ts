import type { QueuedProcessDetails } from "../types/queued_process_details.js";

export interface QueuedProcess {
	process_id: string;
	type: string;
	status: string;
	message: string;
	created_by: string;
	created_by_email: string;
	created_at: string;
	created_at_timestamp: number;
	details: QueuedProcessDetails;
}
