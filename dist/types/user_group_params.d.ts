type GroupLanguages = {
    reference: string[];
    contributable: string[];
};
type AdminRights = "upload" | "activity" | "download" | "settings" | "create_branches" | "statistics" | "keys" | "screenshots" | "glossary" | "contributors" | "languages" | "tasks";
export type UserGroupParams = {
    name: string;
    is_reviewer: boolean;
    is_admin: boolean;
    admin_rights?: AdminRights[];
    languages?: GroupLanguages;
};
export {};
