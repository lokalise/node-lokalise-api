import { expect, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaBundleManagement", function () {
  const token = process.env.API_JWT;
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: token });
  const rootUrl = lokaliseApiOta.clientData.host;
  const teamId = 176692;
  const projectId = "88628569645b945648b474.25982965";
  // const bundleId = 664595;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "ota_bundle_management/list.json",
      uri: `/v3/teams/${teamId}/projects/${projectId}/bundles`,
      skipApiToken: true,
      rootUrl,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const bundles = await lokaliseApiOta.otaBundleManagement().list({
      teamId: teamId,
      lokaliseProjectId: projectId,
    });

    expect(bundles.length).to.eq(2);

    const bundle = bundles[0];
    expect(bundle.id).to.eq(664864);
  });
  // cassette
  //   .createTest("list", async () => {
  //     const bundles = await lokaliseApiOta.otaBundleManagement().list({
  //       teamId: teamId,
  //       lokaliseProjectId: projectId,
  //     });

  //     expect(bundles.length).to.eq(2);

  //     const bundle = bundles[0];
  //     expect(bundle.id).to.eq(664864);
  //   })
  //   .register(this);

  // cassette
  //   .createTest("get", async () => {
  //     const bundle = await lokaliseApiOta.otaBundleManagement().get(bundleId, {
  //       teamId: teamId,
  //       lokaliseProjectId: projectId,
  //     });

  //     expect(bundle.id).to.eq(bundleId);
  //     expect(bundle.projectId).to.eq(projectId);
  //     expect(bundle.isPrerelease).to.eq(true);
  //     expect(bundle.isProduction).to.eq(true);
  //     expect(bundle.createdAt).to.eq("2023-08-23T11:21:29.827Z");
  //     expect(bundle.createdBy).to.eq("20181");
  //     expect(bundle.framework).to.eq("android_sdk");
  //     expect(bundle.description).to.eq("android_demo");
  //     expect(bundle.isFrozen).to.eq(false);
  //     expect(bundle.lokaliseId).to.eq(null);
  //     expect(bundle.fileId).to.eq("843d1a17-306e-426e-b709-13fce39a8549");
  //     expect(bundle.modifiedAt).to.eq("2023-08-23T11:21:29.827Z");
  //     expect(bundle.fileUrl).to.include("ota-bundles.lokalise.com");
  //   })
  //   .register(this);

  // cassette
  //   .createTest("delete", async () => {
  //     const tokenIdDelete = 664594;
  //     const response = await lokaliseApiOta
  //       .otaBundleManagement()
  //       .delete(tokenIdDelete, {
  //         teamId: teamId,
  //         lokaliseProjectId: projectId,
  //       });

  //     expect(response.id).to.eq(tokenIdDelete);
  //     expect(response.deleted).to.be.true;
  //   })
  //   .register(this);

  // cassette
  //   .createTest("update", async () => {
  //     const desc = "Node_updated";

  //     const bundle = await lokaliseApiOta.otaBundleManagement().update(
  //       bundleId,
  //       {
  //         description: desc,
  //       },
  //       {
  //         teamId: teamId,
  //         lokaliseProjectId: projectId,
  //       },
  //     );

  //     expect(bundle.description).to.eq(desc);
  //   })
  //   .register(this);
});
