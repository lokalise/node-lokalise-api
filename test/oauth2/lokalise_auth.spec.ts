import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import {
  RequestTokenResponse,
  RefreshTokenResponse,
  AuthError,
  LokaliseAuth,
} from "../../src/main.js";

describe("LokaliseAuth", function () {
  const cassette = new Cassettes("./test/cassettes");

  const lokaliseAuth = new LokaliseAuth("123abc", "456zyx");

  describe("constructor", function () {
    it("is expected to throw an error if the client secret is not provided", function () {
      expect(function () {
        new LokaliseAuth("fake", "");
      }).to.throw(Error);
    });

    it("is expected to throw an error if the client id is not provided", function () {
      expect(function () {
        new LokaliseAuth("", "fake");
      }).to.throw(Error);
    });

    it("is expected to set authData", function () {
      const dummy = new LokaliseAuth("id", "secret");
      expect(dummy.authData.client_id).to.eq("id");
      expect(dummy.authData.client_secret).to.eq("secret");
    });
  });

  describe("auth", function () {
    it("returns proper url with all set attrs", function () {
      const url = lokaliseAuth.auth(
        ["read_projects", "write_team_groups"],
        "http://example.com/redirect",
        "random123"
      );
      expect(url).to.include("?client_id=123abc");
      expect(url).to.include("&scope=read_projects+write_team_groups");
      expect(url).to.include("&state=random123");
      expect(url).to.include(
        "&redirect_uri=http%3A%2F%2Fexample.com%2Fredirect"
      );
    });

    it("returns proper url with scope as string", function () {
      const url = lokaliseAuth.auth("read_projects");
      expect(url).to.include("?client_id=123abc");
      expect(url).to.include("&scope=read_projects");
    });
  });

  describe("token", function () {
    cassette
      .createTest("valid code", async () => {
        const resp: RequestTokenResponse = await lokaliseAuth.token(
          "fdf9876214cffa10c6ebbb01bd2399077ba9c49e"
        );

        expect(resp.access_token).to.eq("stubbed access");
        expect(resp.refresh_token).to.eq("stubbed refresh");
        expect(resp.expires_in).to.eq(3600);
        expect(resp.token_type).to.eq("Bearer");
      })
      .register(this);

    cassette
      .createTest("error", async () => {
        await lokaliseAuth.token("fake").catch((e: AuthError) => {
          expect(e.code).to.equal(400);
          expect(e.error).to.equal("invalid_request");
          expect(e.error_description).to.equal(
            "client_id: Client id must be 40 characters long"
          );
          expect(e.error_uri).to.equal("");
        });
      })
      .register(this);
  });

  describe("refresh", function () {
    cassette
      .createTest("valid token", async () => {
        const resp: RefreshTokenResponse = await lokaliseAuth.refresh(
          "stubbed refresh"
        );

        expect(resp.access_token).to.eq("stubbed access");
        expect(resp.scope).to.eq("write_team_groups read_projects");
        expect(resp.expires_in).to.eq(3600);
        expect(resp.token_type).to.eq("Bearer");
      })
      .register(this);

    cassette
      .createTest("error", async () => {
        await lokaliseAuth.refresh("fake").catch((e: AuthError) => {
          expect(e.code).to.equal(400);
          expect(e.error).to.equal("invalid_request");
          expect(e.error_description).to.equal(
            "client_id: Client id must be 40 characters long"
          );
          expect(e.error_uri).to.equal("");
        });
      })
      .register(this);
  });
});
