import { SupportedPlatforms } from "../supported_platforms.js";
export type WebhookProjectExported = {
    event: "project.exported";
    export: {
        type: string;
        filename: string;
        platform: SupportedPlatforms;
    };
    project: {
        id: string;
        name: string;
        branch?: string;
    };
    user: {
        email: string;
        full_name: string;
    };
    created_at: string;
    created_at_timestamp: number;
};
