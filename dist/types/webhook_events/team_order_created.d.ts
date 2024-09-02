export type WebhookTeamOrderCreated = {
    event: "team.order.created";
    project: {
        id: string;
        name: string;
        branch?: string;
    };
    order: {
        id: string;
        provider: string;
        currency: string;
        total: string | number;
        languages: Array<{
            id: number;
            iso: string;
            name: string;
        }>;
    };
    user: {
        email: string;
        full_name: string;
    };
    created_at: string;
    created_at_timestamp: number;
};
