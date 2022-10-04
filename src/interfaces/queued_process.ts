import { Keyable } from "./keyable.js";

type ProcessDetails = {
  files: Keyable[];
  [key: string]: any;
};

export interface QueuedProcess {
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
