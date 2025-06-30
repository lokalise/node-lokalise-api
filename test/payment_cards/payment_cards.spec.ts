import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("PaymentCards", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const cardId = 1774;
	const secondCardId = 2185;

	it("lists", async () => {
		const stub = new Stub({
			fixture: "payment_cards/list.json",
			uri: "payment_cards",
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const cards = await lokaliseApi.paymentCards().list();

		expect(cards.items[0].card_id).to.eq(cardId);
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 1,
		};

		const stub = new Stub({
			fixture: "payment_cards/list_pagination.json",
			uri: "payment_cards",
			query: params,
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "2",
				"x-pagination-limit": "1",
				"x-pagination-page-count": "4",
			},
		});

		await stub.setStub();

		const cards = await lokaliseApi.paymentCards().list(params);

		expect(cards.items[0].card_id).to.eq(secondCardId);
		expect(cards.totalResults).to.eq(4);
		expect(cards.totalPages).to.eq(4);
		expect(cards.resultsPerPage).to.eq(1);
		expect(cards.currentPage).to.eq(2);
	});

	it("retrieves", async () => {
		const stub = new Stub({
			fixture: "payment_cards/retrieve.json",
			uri: `payment_cards/${cardId}`,
		});

		await stub.setStub();

		const card = await lokaliseApi.paymentCards().get(cardId);

		expect(card.card_id).to.eq(cardId);
		expect(card.last4).to.eq("0359");
		expect(card.brand).to.eq("Visa");
		expect(card.created_at).to.eq("2019-03-19 17:49:07 (Etc/UTC)");
		expect(card.created_at_timestamp).to.eq(1553017747);
	});

	it("creates", async () => {
		const params = {
			number: "4242424242424242",
			cvc: 123,
			exp_month: 10,
			exp_year: 2030,
		};

		const stub = new Stub({
			fixture: "payment_cards/create.json",
			uri: "payment_cards",
			method: "POST",
			body: params,
		});

		await stub.setStub();

		const card = await lokaliseApi.paymentCards().create(params);

		expect(card.last4).to.eq("4242");
		expect(card.brand).to.eq("MasterCard");
	});

	it("delete", async () => {
		const stub = new Stub({
			fixture: "payment_cards/delete.json",
			uri: `payment_cards/${secondCardId}`,
			method: "DELETE",
		});

		await stub.setStub();

		const response = await lokaliseApi.paymentCards().delete(secondCardId);

		expect(response.card_id).to.eq(secondCardId);
		expect(response.card_deleted).to.be.true;
	});
});
