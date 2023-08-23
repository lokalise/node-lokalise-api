import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";
import { OtaApiError } from "../../src/models/ota_api_error.js";

describe("OtaSdkTokens", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";
  const tokenId = 9428;

  cassette
    .createTest("error", async () => {
      await lokaliseApiOta
        .otaSdkTokens()
        .list({
          teamId: teamId,
          lokaliseProjectId: "fake",
        })
        .catch((e: OtaApiError) => {
          expect(e.message).to.eq("Project not found");
          expect(e.statusCode).to.eq(404);
          expect(e.error).to.eq("ENTITY_NOT_FOUND");
        });
    })
    .register(this);

  cassette
    .createTest("list", async () => {
      const tokens = await lokaliseApiOta.otaSdkTokens().list({
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(tokens[0].id).to.eq(9434);
      expect(tokens.length).to.eq(1);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const token = await lokaliseApiOta.otaSdkTokens().create({
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(token.id).to.eq(9451);
      expect(token.token).to.eq("a3511c8e335ac3c770ea96ede1a28f3ce263");
      expect(token.projectId).to.eq(20984);
      expect(token.lokaliseId).to.eq(null);
      expect(token.createdAt).to.eq("2023-08-23T15:23:39.843Z");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApiOta.otaSdkTokens().delete(tokenId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(response.id).to.eq(tokenId);
      expect(response.deleted).to.be.true;
    })
    .register(this);
});
