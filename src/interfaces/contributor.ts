import { Keyable } from "../interfaces/keyable";

export interface Contributor {
  user_id: number;
  email: string;
  fullname: string;
  created_at: string;
  created_at_timestamp: number;
  is_admin: boolean;
  is_reviewer: boolean;
  languages: Keyable;
  admin_rights: string[];
}
