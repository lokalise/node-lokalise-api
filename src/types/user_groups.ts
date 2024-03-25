type GroupLanguages = {
  reference: string[];
  contributable: string[];
};

export type AdminRights =
  | "upload"
  | "activity"
  | "download"
  | "settings"
  | "create_branches"
  | "statistics"
  | "keys"
  | "screenshots"
  | "glossary"
  | "contributors"
  | "languages"
  | "tasks";

export type UserGroupParams = {
  name: string;
  is_reviewer: boolean;
  is_admin: boolean;
  admin_rights?: AdminRights[];
  languages?: GroupLanguages;
};

export type UserGroupDeleted = {
  team_id: string;
  group_deleted: boolean;
};
