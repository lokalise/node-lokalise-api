import { LokaliseApi, Stub, expect } from "../setup.js";

describe("Teams", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  it("lists", async function () {
    const stub = new Stub({
      fixture: "teams/list.json",
      uri: `teams`,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const teams = await lokaliseApi.teams().list();
    const team = teams.items[0];
    expect(team.team_id).to.eq(186612);
    expect(team.name).to.eq("NikaNika");
    expect(team.plan).to.eq("Trial");
    expect(team.created_at).to.eq("2019-04-11 11:12:49 (Etc/UTC)");
    expect(team.created_at_timestamp).to.eq(1554981169);
    expect(team.quota_usage.users).to.eq(2);
    expect(team.quota_allowed.keys).to.eq(999999999);
  });

  it("lists and paginates", async function () {
    const params = { page: 2, limit: 1 };

    const stub = new Stub({
      fixture: "teams/list_pagination.json",
      uri: `teams`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "2",
        "x-pagination-limit": "1",
        "x-pagination-page-count": "3",
      },
    });

    await stub.setStub();

    const teams = await lokaliseApi.teams().list(params);

    expect(teams.items[0].team_id).to.eq(176692);
    expect(teams.totalResults).to.eq(3);
    expect(teams.totalPages).to.eq(3);
    expect(teams.resultsPerPage).to.eq(1);
    expect(teams.currentPage).to.eq(2);
  });
});
