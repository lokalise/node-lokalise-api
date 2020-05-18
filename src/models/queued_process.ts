import { BaseModel } from "./base_model";
import { QueuedProcess as QueuedProcessInterface } from "../interfaces";

export class QueuedProcess extends BaseModel implements QueuedProcessInterface {
  process_id: string;
  type: string;
  status: string;
  message: string;
  created_by: string;
  created_by_email: string;
  created_at: string;
  created_at_timestamp: number;
  details?: object[];
}
