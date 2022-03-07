require("../setup");
import { expect } from "chai";
import { LokaliseAuth } from "../../src/oauth2/lokalise_auth";

describe("LokaliseAuth", function () {
  const lokaliseAuth = new LokaliseAuth(
    process.env.OAUTH2_CLIENT_ID,
    process.env.OAUTH2_CLIENT_SECRET
  );

  describe("auth", function () {
    it("returns proper url with all set attrs", function () {
      const url = lokaliseAuth.auth(
        ["read_projects", "write_team_groups"],
        "http://example.com/redirect",
        "random123"
      );
      expect(url).to.include("?client_id=d0");
      expect(url).to.include("&scope=read_projects+write_team_groups");
      expect(url).to.include("&state=random123");
      expect(url).to.include(
        "&redirect_uri=http%3A%2F%2Fexample.com%2Fredirect"
      );
    });

    it("returns proper url with scope as string", function () {
      const url = lokaliseAuth.auth("read_projects");
      expect(url).to.include("?client_id=d0");
      expect(url).to.include("&scope=read_projects");
    });
  });
});
