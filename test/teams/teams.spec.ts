import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("Teams", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  cassette
    .createTest("list", async () => {
      const teams = await lokaliseApi.teams().list();
      const team = teams.items[0];

      expect(team.team_id).to.eq(186612);
      expect(team.name).to.eq("NikaNika");
      expect(team.plan).to.eq("Trial");
      expect(team.created_at).to.eq("2019-04-11 11:12:49 (Etc/UTC)");
      expect(team.created_at_timestamp).to.eq(1554981169);
      expect(team.quota_usage.users).to.eq(2);
      expect(team.quota_allowed.keys).to.eq(999999999);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const teams = await lokaliseApi.teams().list({ page: 2, limit: 1 });

      expect(teams.items[0].team_id).to.eq(186612);
      expect(teams.totalResults).to.eq(4);
      expect(teams.totalPages).to.eq(4);
      expect(teams.resultsPerPage).to.eq(1);
      expect(teams.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("list_pagination_gzip", async () => {
      const anotherApi = new LokaliseApi({
        apiKey: process.env.API_KEY,
        enableCompression: true,
      });
      const teams = await anotherApi.teams().list({ page: 2, limit: 1 });

      expect(teams.items[0].team_id).to.eq(186612);
      expect(teams.totalResults).to.eq(4);
      expect(teams.totalPages).to.eq(4);
      expect(teams.resultsPerPage).to.eq(1);
      expect(teams.currentPage).to.eq(2);
    })
    .register(this);
});
