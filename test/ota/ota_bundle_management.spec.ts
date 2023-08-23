import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOta } from "../../src/main.js";

describe("OtaBundleManagement", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: process.env.API_JWT });
  const teamId = 176692;
  const projectId = "963054665b7c313dd9b323.35886655";
  const bundleId = 664595;

  cassette
    .createTest("list", async () => {
      const bundles = await lokaliseApiOta.otaBundleManagement().list({
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(bundles.length).to.eq(2);

      const bundle = bundles[0];
      expect(bundle.id).to.eq(664864);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const bundle = await lokaliseApiOta.otaBundleManagement().get(bundleId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

      expect(bundle.id).to.eq(bundleId);
      expect(bundle.projectId).to.eq(projectId);
      expect(bundle.isPrerelease).to.eq(true);
      expect(bundle.isProduction).to.eq(true);
      expect(bundle.createdAt).to.eq("2023-08-23T11:21:29.827Z");
      expect(bundle.createdBy).to.eq("20181");
      expect(bundle.framework).to.eq("android_sdk");
      expect(bundle.description).to.eq("android_demo");
      expect(bundle.isFrozen).to.eq(false);
      expect(bundle.lokaliseId).to.eq(null);
      expect(bundle.fileId).to.eq("843d1a17-306e-426e-b709-13fce39a8549");
      expect(bundle.modifiedAt).to.eq("2023-08-23T11:21:29.827Z");
      expect(bundle.fileUrl).to.include("ota-bundles.lokalise.com");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const tokenIdDelete = 664594;
      const response = await lokaliseApiOta
        .otaBundleManagement()
        .delete(tokenIdDelete, {
          teamId: teamId,
          lokaliseProjectId: projectId,
        });

      expect(response.id).to.eq(tokenIdDelete);
      expect(response.deleted).to.be.true;
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const desc = "Node_updated";

      const bundle = await lokaliseApiOta.otaBundleManagement().update(
        bundleId,
        {
          description: desc,
        },
        {
          teamId: teamId,
          lokaliseProjectId: projectId,
        },
      );

      expect(bundle.description).to.eq(desc);
    })
    .register(this);
});
