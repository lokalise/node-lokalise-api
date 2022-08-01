import { BaseModel } from "./base_model";
import { QueuedProcess as QueuedProcessInterface } from "../interfaces/queued_process";
import { Keyable } from "../interfaces/keyable";

type ProcessDetails = {
  files: Keyable[];
  [key: string]: any;
};

export class QueuedProcess extends BaseModel implements QueuedProcessInterface {
  declare process_id: string;
  declare type: string;
  declare status: string;
  declare message: string;
  declare created_by: string;
  declare created_by_email: string;
  declare created_at: string;
  declare created_at_timestamp: number;
  declare details: ProcessDetails;
}
