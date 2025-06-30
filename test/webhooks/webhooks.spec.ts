import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("Webhooks", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const projectId = "803826145ba90b42d5d860.46800099";
	const webhookId = "795565582e5ab15a59bb68156c7e2e9eaa1e8d1a";
	const newWebhookId = "85b5793926ba936d1a5ca100ec96c0884b9b7f64";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "webhooks/list.json",
			uri: `projects/${projectId}/webhooks`,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const webhooks = await lokaliseApi.webhooks().list({
			project_id: projectId,
		});

		expect(webhooks.items[0].url).to.eq("https://serios.webhook");
	});

	it("lists and pagination", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "webhooks/list_pagination.json",
			uri: `projects/${projectId}/webhooks`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const webhooks = await lokaliseApi.webhooks().list({
			project_id: projectId,
			...params,
		});

		expect(webhooks.items[0].url).to.eq("http://node.hook");
		expect(webhooks.totalResults).to.eq(2);
		expect(webhooks.totalPages).to.eq(2);
		expect(webhooks.resultsPerPage).to.eq(2);
		expect(webhooks.currentPage).to.eq(2);
		expect(webhooks.nextPage()).to.eq(2);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "webhooks/retrieve.json",
			uri: `projects/${projectId}/webhooks/${webhookId}`,
		});

		await stub.setStub();

		const webhook = await lokaliseApi.webhooks().get(webhookId, {
			project_id: projectId,
		});

		expect(webhook.webhook_id).to.eq(webhookId);
		expect(webhook.url).to.eq("https://serios.webhook");
		expect(webhook.branch).to.eq(null);
		expect(webhook.secret).to.eq("42fd07785e2e281602d75c9044add68a15f454dc");
		expect(webhook.events[0]).to.eq("project.imported");
		expect(webhook.event_lang_map[0].event).to.eq(
			"project.translation.updated",
		);
	});

	it("creates", async () => {
		const params = {
			url: "https://bodrovis.tech/lokalise",
			events: ["project.exported"],
		};

		const stub = new Stub({
			fixture: "webhooks/create.json",
			uri: `projects/${projectId}/webhooks`,
			body: params,
			method: "POST",
		});

		await stub.setStub();

		const webhook = await lokaliseApi
			.webhooks()
			.create(params, { project_id: projectId });

		expect(webhook.webhook_id).to.eq(newWebhookId);
		expect(webhook.url).to.eq(params.url);
		expect(webhook.events[0]).to.eq("project.exported");
	});

	it("updates", async () => {
		const params = {
			url: "https://bodrovis.tech/lokalise",
			events: ["project.snapshot"],
		};

		const stub = new Stub({
			fixture: "webhooks/update.json",
			uri: `projects/${projectId}/webhooks/${newWebhookId}`,
			body: params,
			method: "PUT",
		});

		await stub.setStub();

		const webhook = await lokaliseApi
			.webhooks()
			.update(newWebhookId, params, { project_id: projectId });

		expect(webhook.webhook_id).to.eq(newWebhookId);
		expect(webhook.url).to.eq(params.url);
		expect(webhook.events[0]).to.eq("project.snapshot");
	});

	it("regenerates secrets", async () => {
		const stub = new Stub({
			fixture: "webhooks/regenerate_secret.json",
			uri: `projects/${projectId}/webhooks/${newWebhookId}/secret/regenerate`,
			method: "PATCH",
		});

		await stub.setStub();

		const response = await lokaliseApi
			.webhooks()
			.regenerate_secret(newWebhookId, {
				project_id: projectId,
			});

		expect(response.project_id).to.eq(projectId);
		expect(response.secret).to.eq("18f078b45fbaba782f768324c031080eee0040c7");
	});

	it("deletes", async () => {
		const stub = new Stub({
			fixture: "webhooks/delete.json",
			uri: `projects/${projectId}/webhooks/${newWebhookId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi.webhooks().delete(newWebhookId, {
			project_id: projectId,
		});

		expect(response.project_id).to.eq(projectId);
		expect(response.webhook_deleted).to.eq(true);
	});
});
