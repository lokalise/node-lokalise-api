require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api";

describe("TranslationProviders", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const team_id = 176692;

  cassette
    .createTest("list", async () => {
      const providers = await lokaliseApi.translationProviders.list({
        team_id: team_id,
      });
      expect(providers.items[0].name).to.eq("Gengo");
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const providers = await lokaliseApi.translationProviders.list({
        team_id: team_id,
        page: 2,
        limit: 1,
      });
      expect(providers.items[0].name).to.eq("Lokalise");
      expect(providers.totalResults).to.eq(2);
      expect(providers.totalPages).to.eq(2);
      expect(providers.resultsPerPage).to.eq(1);
      expect(providers.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const provider = await lokaliseApi.translationProviders.get(4, {
        team_id: team_id,
      });
      expect(provider.provider_id).to.eq(4);
      expect(provider.name).to.eq("Lokalise");
      expect(provider.slug).to.eq("lokalise");
      expect(provider.price_pair_min).to.eq("10.00");
      expect(provider.website_url).to.eq("https://lokalise.co");
      expect(provider.description).to.include(
        "Our native professional translations"
      );
      expect(provider.tiers).to.have.lengthOf(4);
      expect(provider.tiers[1]["tier_id"]).to.eq(2);
    })
    .register(this);
});
