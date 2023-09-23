import { LokaliseApi, Stub, expect } from "../setup.js";
import { TeamUserParams } from "../../src/main.js";

describe("TeamUsers", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const teamId = 176692;
  const userId = 308781;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "team_users/list.json",
      uri: `teams/${teamId}/users`,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const team_users = await lokaliseApi.teamUsers().list({ team_id: teamId });

    expect(team_users.items[0].user_id).to.eq(userId);
  });

  it("lists and paginates", async function () {
    const params = {
      page: 2,
      limit: 2,
    };

    const stub = new Stub({
      fixture: "team_users/list_pagination.json",
      uri: `teams/${teamId}/users`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "3",
        "x-pagination-page": "2",
        "x-pagination-limit": "2",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const team_users = await lokaliseApi
      .teamUsers()
      .list({ team_id: teamId, ...params });

    expect(team_users.items[0].user_id).to.eq(141203);
    expect(team_users.totalResults).to.eq(3);
    expect(team_users.totalPages).to.eq(2);
    expect(team_users.resultsPerPage).to.eq(2);
    expect(team_users.currentPage).to.eq(2);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "team_users/retrieve.json",
      uri: `teams/${teamId}/users/${20181}`,
    });

    await stub.setStub();

    const team_user = await lokaliseApi.teamUsers().get(20181, {
      team_id: teamId,
    });

    expect(team_user.user_id).to.eq(20181);
    expect(team_user.email).to.eq("bodrovis@protonmail.com");
    expect(team_user.fullname).to.eq("Ilya B");
    expect(team_user.created_at).to.eq("2018-08-21 15:35:25 (Etc/UTC)");
    expect(team_user.created_at_timestamp).to.eq(1534865725);
    expect(team_user.role).to.eq("owner");
  });

  it("updates", async function () {
    const params: TeamUserParams = { role: "admin" };

    const stub = new Stub({
      fixture: "team_users/update.json",
      uri: `teams/${teamId}/users/${userId}`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const team_user = await lokaliseApi
      .teamUsers()
      .update(userId, params, { team_id: teamId });

    expect(team_user.user_id).to.eq(userId);
    expect(team_user.role).to.eq("admin");
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "team_users/delete.json",
      uri: `teams/${teamId}/users/${userId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.teamUsers().delete(userId, {
      team_id: teamId,
    });

    expect(response.team_id).to.eq(teamId);
    expect(response.team_user_deleted).to.be.true;
  });
});
