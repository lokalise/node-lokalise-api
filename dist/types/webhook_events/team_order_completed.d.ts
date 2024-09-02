export type WebhookTeamOrderCompleted = {
	event: "team.order.completed";
	project: {
		id: string;
		name: string;
		branch?: string;
	};
	order: {
		id: string;
		provider: string;
	};
	created_at: string;
	created_at_timestamp: number;
};
