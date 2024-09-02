export type WebhookProjectContributorDeleted = {
    event: "project.contributor.deleted";
    contributor: {
        email: string;
    };
    project: {
        id: string;
        name: string;
    };
    user: {
        email: string;
        full_name: string;
    };
    created_at: string;
    created_at_timestamp: number;
};
