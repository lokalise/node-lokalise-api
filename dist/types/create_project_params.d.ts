export type CreateProjectParams = {
    name: string;
    team_id?: number | string;
    description?: string;
    languages?: Array<{
        lang_iso: string;
        custom_iso?: string;
    }>;
    base_lang_iso?: string;
    project_type?: "localization_files" | "paged_documents";
    is_segmentation_enabled?: boolean;
};
