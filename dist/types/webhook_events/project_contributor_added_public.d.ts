export type WebhookProjectContributorAddedPublic = {
    event: "project.contributor.added_public";
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
