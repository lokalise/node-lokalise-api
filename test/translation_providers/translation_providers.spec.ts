import { LokaliseApi, Stub, describe, expect, it } from "../setup.js";

describe("TranslationProviders", () => {
	const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
	const teamId = 176692;

	it("lists", async () => {
		const stub = new Stub({
			fixture: "translation_providers/list.json",
			uri: `teams/${teamId}/translation_providers`,
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "1",
				"x-pagination-limit": "500",
				"x-pagination-page-count": "1",
			},
		});

		await stub.setStub();

		const providers = await lokaliseApi.translationProviders().list({
			team_id: teamId,
		});

		expect(providers.items[0].name).to.eq("Gengo");
	});

	it("lists and paginates", async () => {
		const params = {
			page: 2,
			limit: 2,
		};

		const stub = new Stub({
			fixture: "translation_providers/list_pagination.json",
			uri: `teams/${teamId}/translation_providers`,
			query: params,
			respHeaders: {
				"x-pagination-total-count": "4",
				"x-pagination-page": "2",
				"x-pagination-limit": "2",
				"x-pagination-page-count": "2",
			},
		});

		await stub.setStub();

		const providers = await lokaliseApi.translationProviders().list({
			team_id: teamId,
			...params,
		});

		expect(providers.items[0].name).to.eq("Lokalise");
		expect(providers.totalResults).to.eq(4);
		expect(providers.totalPages).to.eq(2);
		expect(providers.resultsPerPage).to.eq(2);
		expect(providers.currentPage).to.eq(2);
	});

	it("retrieves", async () => {
		const providerId = 4;

		const stub = new Stub({
			fixture: "translation_providers/retrieve.json",
			uri: `teams/${teamId}/translation_providers/${providerId}`,
		});

		await stub.setStub();

		const provider = await lokaliseApi.translationProviders().get(providerId, {
			team_id: teamId,
		});

		expect(provider.provider_id).to.eq(4);
		expect(provider.name).to.eq("Lokalise");
		expect(provider.slug).to.eq("lokalise");
		expect(provider.price_pair_min).to.eq("10.00");
		expect(provider.website_url).to.eq("https://lokalise.com");
		expect(provider.description).to.include("Our native professional");
		expect(provider.tiers).to.have.lengthOf(4);
		expect(provider.tiers[1].tier_id).to.eq(2);
		expect(provider.tiers[0].title).to.eq(
			"Translation only by a native professional linguist",
		);

		const pair = provider.pairs[0];
		expect(pair.tier_id).to.eq(1);
		expect(pair.price_per_word).to.eq(0.1);
		expect(pair.from_lang_name).to.eq("Russian");
		expect(pair.to_lang_iso).to.eq("en");
		expect(pair.to_lang_name).to.eq("English");
	});
});
