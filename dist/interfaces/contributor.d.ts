export interface Contributor {
    user_id: number;
    email: string;
    fullname: string;
    created_at: string;
    created_at_timestamp: number;
    is_admin: boolean;
    is_reviewer: boolean;
    languages: Array<{
        lang_id: number;
        lang_iso: string;
        lang_name: string;
        is_writable: boolean;
    }>;
    admin_rights: string[];
}
