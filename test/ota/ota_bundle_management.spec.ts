import { expect, it, describe, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaBundleManagement", function () {
  const token = process.env.API_JWT;
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: token });
  const rootUrl = lokaliseApiOta.clientData.host;
  const teamId = 176692;
  const projectId = "88628569645b945648b474.25982965";
  const bundleId = 680066;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "ota_bundle_management/list.json",
      uri: `teams/${teamId}/projects/${projectId}/bundles`,
      version: "v3",
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

    expect(bundles.length).to.eq(1);

    const bundle = bundles[0];
    expect(bundle.id).to.eq(bundleId);
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "ota_bundle_management/retrieve.json",
      uri: `teams/${teamId}/projects/${projectId}/bundles/${bundleId}`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const bundle = await lokaliseApiOta.otaBundleManagement().get(bundleId, {
      teamId: teamId,
      lokaliseProjectId: projectId,
    });

    expect(bundle.id).to.eq(bundleId);
    expect(bundle.projectId).to.eq(projectId);
    expect(bundle.isPrerelease).to.eq(true);
    expect(bundle.isProduction).to.eq(true);
    expect(bundle.createdAt).to.eq("2023-09-20T13:39:20.469Z");
    expect(bundle.createdBy).to.eq("20181");
    expect(bundle.framework).to.eq("ios_sdk");
    expect(bundle.description).to.eq("");
    expect(bundle.isFrozen).to.eq(false);
    expect(bundle.lokaliseId).to.eq(859006);
    expect(bundle.fileId).to.eq("9b946841-a83c-4353-be2c-13f387406e6d");
    expect(bundle.modifiedAt).to.eq("2023-09-20T13:39:20.469Z");
    expect(bundle.fileUrl).to.include("ota-bundles.lokalise.com");
  });

  it("updates", async function () {
    const params = {
      description: "updated!",
    };

    const stub = new Stub({
      fixture: "ota_bundle_management/update.json",
      uri: `teams/${teamId}/projects/${projectId}/bundles/${bundleId}`,
      version: "v3",
      skipApiToken: true,
      body: params,
      method: "PATCH",
      rootUrl,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const bundle = await lokaliseApiOta
      .otaBundleManagement()
      .update(bundleId, params, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

    expect(bundle.description).to.eq(params.description);
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "ota_bundle_management/delete.json",
      uri: `teams/${teamId}/projects/${projectId}/bundles/${bundleId}`,
      version: "v3",
      skipApiToken: true,
      method: "DELETE",
      rootUrl,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const response = await lokaliseApiOta
      .otaBundleManagement()
      .delete(bundleId, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

    expect(response.id).to.eq(bundleId);
    expect(response.deleted).to.be.true;
  });
});
