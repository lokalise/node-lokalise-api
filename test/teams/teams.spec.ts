require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("Teams", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  cassette
    .createTest("list", async () => {
      const teams = await lokaliseApi.teams.list();

      expect(teams.items[0].team_id).to.eq(186612);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const teams = await lokaliseApi.teams.list({ page: 2, limit: 1 });

      expect(teams.items[0].team_id).to.eq(176692);
      expect(teams.totalResults).to.eq(3);
      expect(teams.totalPages).to.eq(3);
      expect(teams.resultsPerPage).to.eq(1);
      expect(teams.currentPage).to.eq(2);
    })
    .register(this);
});
