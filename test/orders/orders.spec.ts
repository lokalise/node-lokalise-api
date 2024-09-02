import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("Orders", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const teamId = 176692;
	const orderId = "20200116FM1";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "orders/list.json",
			uri: `teams/${teamId}/orders`,
			respHeaders: {
				"x-pagination-total-count": "2",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const orders = await lokaliseApi.orders().list({ team_id: teamId });

		expect(orders.items[0].order_id).to.eq(orderId);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "orders/list_pagination.json",
			uri: `teams/${teamId}/orders`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const orders = await lokaliseApi.orders().list({
			team_id: teamId,
			...params,
		});

		expect(orders.items[0].order_id).to.eq("20200127G0B");
		expect(orders.totalResults).to.eq(4);
		expect(orders.totalPages).to.eq(2);
		expect(orders.resultsPerPage).to.eq(2);
		expect(orders.currentPage).to.eq(2);
		expect(orders.hasNextPage()).to.be.false;
		expect(orders.prevPage()).to.eq(1);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "orders/retrieve.json",
			uri: `teams/${teamId}/orders/${orderId}`,
		});

		await stub.setStub();

		const order = await lokaliseApi.orders().get(orderId, {
			team_id: teamId,
		});

		expect(order.order_id).to.eq(orderId);
		expect(order.branch).to.eq(null);
		expect(order.project_id).to.eq("576418155e1db80a3136c5.33298570");
		expect(order.card_id).to.eq(2185);
		expect(order.status).to.eq("completed");
		expect(order.created_at).to.eq("2020-01-16 14:20:56 (Etc/UTC)");
		expect(order.created_at_timestamp).to.eq(1579184456);
		expect(order.created_by).to.eq(20181);
		expect(order.created_by_email).to.eq("bodrovis@protonmail.com");
		expect(order.source_language_iso).to.eq("en");
		expect(order.target_language_isos).to.include("lv_LV");
		expect(order.keys).to.include(35076371);
		expect(order.source_words.lv_LV).to.eq(22);
		expect(order.provider_slug).to.eq("google");
		expect(order.translation_style).to.eq(null);
		expect(order.translation_tier).to.eq(1);
		expect(order.translation_tier_name).to.eq(null);
		expect(order.briefing).to.eq(null);
		expect(order.is_saved_to_translation_memory).to.eq(true);
		expect(order.total).to.eq(0.02);
		expect(order.payment_method).to.eq(null);
	});

	it("creates", async () => {
		const params = {
			project_id: "803826145ba90b42d5d860.46800099",
			card_id: "1774",
			briefing: "Nothing specific",
			source_language_iso: "en",
			target_language_isos: ["nl"],
			keys: [74189435],
			provider_slug: "gengo",
			translation_tier: "1",
			dry_run: true,
		};

		const stub = new Stub({
			fixture: "orders/create.json",
			uri: `teams/${teamId}/orders`,
			method: "POST",
			body: params,
		});

		await stub.setStub();

		const order = await lokaliseApi.orders().create(params, {
			team_id: teamId,
		});

		expect(order.dry_run).to.eq(true);
		expect(order.target_language_isos).to.include("nl");
		expect(order.created_by).to.eq(20181);
	});
});
