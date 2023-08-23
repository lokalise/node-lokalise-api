import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";

describe("OtaFreezePeriods", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";
  const freezeId = 34301;

  cassette
    .createTest("list", async () => {
      const freezes = await lokaliseApiOta.otaFreezePeriods().list({
        teamId: teamId,
        lokaliseProjectId: projectId,
        framework: "ios_sdk",
      });

      expect(freezes.length).to.eq(2);

      const freeze = freezes[0];
      expect(freeze.id).to.eq(34299);
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const bundleId = 664864;
      const freeze = await lokaliseApiOta.otaFreezePeriods().create(
        {
          from: "5.0",
          to: "6.0",
          bundleId: bundleId,
        },
        {
          teamId: teamId,
          lokaliseProjectId: projectId,
        },
      );

      expect(freeze.id).to.eq(34303);
      expect(freeze.projectId).to.eq(20984);
      expect(freeze.bundleId).to.eq(bundleId);
      expect(freeze.framework).to.eq("ios_sdk");
      expect(freeze.from).to.eq("5.0");
      expect(freeze.to).to.eq("6.0");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const freeze = await lokaliseApiOta.otaFreezePeriods().update(
        freezeId,
        {
          from: "5.0",
          to: "7.0",
          bundleId: 664798,
        },
        {
          teamId: teamId,
          lokaliseProjectId: projectId,
        },
      );

      expect(freeze.to).to.eq("7.0");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const resp = await lokaliseApiOta.otaFreezePeriods().delete(freezeId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(resp.deleted).to.be.true;
    })
    .register(this);
});
