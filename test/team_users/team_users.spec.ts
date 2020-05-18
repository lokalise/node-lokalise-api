require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("TeamUsers", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const team_id = 176692;
  const user_id = 39938;

  cassette
    .createTest("list", async () => {
      const team_users = await lokaliseApi.teamUsers.list({ team_id: team_id });

      expect(team_users[0].user_id).to.eq(user_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const team_users = await lokaliseApi.teamUsers.list({
        team_id: team_id,
        page: 3,
        limit: 1,
      });

      expect(team_users[0].user_id).to.eq(35554);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const team_user = await lokaliseApi.teamUsers.get(user_id, {
        team_id: team_id,
      });

      expect(team_user.user_id).to.eq(user_id);
      expect(team_user.email).to.eq("translator2@mycompany.com");
      expect(team_user.fullname).to.eq("Mr. Translator");
      expect(team_user.created_at).to.eq("2019-06-19 20:12:11 (Etc/UTC)");
      expect(team_user.created_at_timestamp).to.eq(1560975131);
      expect(team_user.role).to.eq("member");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const team_user = await lokaliseApi.teamUsers.update(
        user_id,
        { role: "admin" },
        { team_id: team_id }
      );

      expect(team_user.user_id).to.eq(user_id);
      expect(team_user.role).to.eq("admin");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.teamUsers.delete(user_id, {
        team_id: team_id,
      });

      expect(response.team_id).to.eq(team_id);
      expect(response.team_user_deleted).to.be.true;
    })
    .register(this);
});
