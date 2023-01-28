import { BaseModel } from "./base_model";
import { QueuedProcess as QueuedProcessInterface } from "../interfaces/queued_process";
import { Keyable } from "../interfaces/keyable";
type ProcessDetails = {
    files: Keyable[];
    [key: string]: any;
};
export declare class QueuedProcess extends BaseModel implements QueuedProcessInterface {
    process_id: string;
    type: string;
    status: string;
    message: string;
    created_by: string;
    created_by_email: string;
    created_at: string;
    created_at_timestamp: number;
    details: ProcessDetails;
}
export {};
