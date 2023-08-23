import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";

describe("OtaBundlePublishing", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";
  const bundleId = 664595;

  cassette
    .createTest("publish", async () => {
      const res = await lokaliseApiOta.otaBundlePublishing().publish(bundleId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
        framework: "android_sdk",
      });

      expect(res).to.be.null;
    })
    .register(this);

  cassette
    .createTest("stage", async () => {
      const res = await lokaliseApiOta.otaBundlePublishing().stage(bundleId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
        framework: "android_sdk",
      });

      expect(res).to.be.null;
    })
    .register(this);
});
