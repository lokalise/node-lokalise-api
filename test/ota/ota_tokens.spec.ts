import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";
import { OtaApiError } from "../../src/models/ota_api_error.js";

describe("SdkTokens", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";
  const tokenId = 9428;

  cassette
    .createTest("error", async () => {
      await lokaliseApiOta
        .sdkTokens()
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
      const tokens = await lokaliseApiOta.sdkTokens().list({
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(tokens[0].id).to.eq(tokenId);
      expect(tokens.length).to.eq(3);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const token = await lokaliseApiOta.sdkTokens().create({
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(token.id).to.eq(9433);
      expect(token.token).to.eq("c72f9bf9f88e0779275d4832ca0e56933a89");
      expect(token.projectId).to.eq(20984);
      expect(token.lokaliseId).to.eq(null);
      expect(token.createdAt).to.eq("2023-08-22T15:05:51.227Z");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApiOta.sdkTokens().delete(tokenId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(response.id).to.eq(tokenId);
      expect(response.deleted).to.be.true;
    })
    .register(this);
});
