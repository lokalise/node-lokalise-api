export type WebhookProjectTaskDeleted = {
    event: "project.task.deleted";
    task: {
        id: number;
        type: string;
        title: string;
        due_date: string;
        description: string;
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
