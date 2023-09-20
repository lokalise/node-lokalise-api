import { LokaliseAuth, Stub, expect } from "../setup.js";
import {
  RequestTokenResponse,
  RefreshTokenResponse,
  AuthError,
} from "../../src/main.js";

describe("LokaliseAuth", function () {
  const client_id = <string>process.env.OAUTH2_CLIENT_ID;
  const client_secret = <string>process.env.OAUTH2_CLIENT_SECRET;
  const refresh_token = <string>process.env.OAUTH2_REFRESH_TOKEN;
  const rootUrl = "https://app.lokalise.com";
  const lokaliseAuth = new LokaliseAuth(client_id, client_secret);

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
        "random123",
      );
      expect(url).to.include(`?client_id=${client_id}`);
      expect(url).to.include("&scope=read_projects+write_team_groups");
      expect(url).to.include("&state=random123");
      expect(url).to.include(
        "&redirect_uri=http%3A%2F%2Fexample.com%2Fredirect",
      );
    });

    it("returns proper url with scope as string", function () {
      const url = lokaliseAuth.auth("read_projects");
      expect(url).to.include(`?client_id=${client_id}`);
      expect(url).to.include("&scope=read_projects");
    });
  });

  describe("token", function () {
    const code = "12988e3ec899e0c73a1fc4909063d81ca5ab0dd1";

    it("can be requested", async function () {
      const stub = new Stub({
        fixture: "oauth2/token.json",
        uri: "/oauth2/token",
        method: "POST",
        rootUrl: rootUrl,
        skipApiToken: true,
        body: {
          client_id,
          client_secret,
          code,
          grant_type: "authorization_code",
        },
      });

      await stub.setStub();

      const resp: RequestTokenResponse = await lokaliseAuth.token(code);

      expect(resp.access_token).to.eq("stubbed access");
      expect(resp.refresh_token).to.eq("stubbed refresh");
      expect(resp.expires_in).to.eq(3600);
      expect(resp.token_type).to.eq("Bearer");
    });

    it("handles errors", async function () {
      const stub = new Stub({
        fixture: "oauth2/token_error.json",
        uri: "/oauth2/token",
        status: 400,
        method: "POST",
        rootUrl: rootUrl,
        skipApiToken: true,
        body: {
          client_id,
          client_secret,
          code: "fake",
          grant_type: "authorization_code",
        },
      });

      await stub.setStub();

      await lokaliseAuth.token("fake").catch((e: AuthError) => {
        expect(e.code).to.equal(400);
        expect(e.error).to.equal("invalid_request");
        expect(e.error_description).to.equal(
          "code: Code must be 40 characters long",
        );
        expect(e.error_uri).to.equal("");
      });
    });
  });

  describe("refresh", function () {
    it("can be requested", async function () {
      const stub = new Stub({
        fixture: "oauth2/refresh.json",
        uri: "/oauth2/token",
        method: "POST",
        rootUrl: rootUrl,
        skipApiToken: true,
        body: {
          client_id,
          client_secret,
          refresh_token,
          grant_type: "refresh_token",
        },
      });

      await stub.setStub();

      const resp: RefreshTokenResponse =
        await lokaliseAuth.refresh(refresh_token);

      expect(resp.access_token).to.eq("stubbed access");
      expect(resp.scope).to.eq("write_team_groups read_projects");
      expect(resp.expires_in).to.eq(3600);
      expect(resp.token_type).to.eq("Bearer");
    });

    it("handles errors", async function () {
      const stub = new Stub({
        fixture: "oauth2/refresh_error.json",
        uri: "/oauth2/token",
        status: 400,
        method: "POST",
        rootUrl: rootUrl,
        skipApiToken: true,
        body: {
          client_id,
          client_secret,
          refresh_token: "fake",
          grant_type: "refresh_token",
        },
      });

      await stub.setStub();

      await lokaliseAuth.refresh("fake").catch((e: AuthError) => {
        expect(e.code).to.equal(400);
        expect(e.error).to.equal("invalid_request");
        expect(e.error_description).to.equal(
          "refresh_token: Refresh token too short",
        );
        expect(e.error_uri).to.equal("");
      });
    });
  });
});
