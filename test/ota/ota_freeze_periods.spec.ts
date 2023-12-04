import { expect, it, describe, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaFreezePeriods", function () {
  const token = process.env.API_JWT;
  const lokaliseApiOta = new LokaliseApiOta({ apiKey: token });
  const rootUrl = lokaliseApiOta.clientData.host;
  const teamId = 176692;
  const projectId = "88628569645b945648b474.25982965";
  const freezeId = 38301;
  const framework = "ios_sdk";
  const bundleId = 682463;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "ota_freeze_periods/list.json",
      uri: `teams/${teamId}/projects/${projectId}/bundle-freezes`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      query: { framework },
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const freezes = await lokaliseApiOta.otaFreezePeriods().list({
      teamId: teamId,
      lokaliseProjectId: projectId,
      framework,
    });

    expect(freezes.length).to.eq(2);

    const freeze = freezes[0];
    expect(freeze.id).to.eq(38299);
  });

  it("creates", async function () {
    const params = {
      from: "5.0",
      to: "6.0",
      bundleId: bundleId,
    };

    const stub = new Stub({
      fixture: "ota_freeze_periods/create.json",
      uri: `teams/${teamId}/projects/${projectId}/bundle-freezes`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      method: "POST",
      body: params,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const freeze = await lokaliseApiOta.otaFreezePeriods().create(params, {
      teamId: teamId,
      lokaliseProjectId: projectId,
    });

    expect(freeze.id).to.eq(freezeId);
    expect(freeze.projectId).to.eq(188763);
    expect(freeze.bundleId).to.eq(bundleId);
    expect(freeze.framework).to.eq("ios_sdk");
    expect(freeze.from).to.eq("5.0");
    expect(freeze.to).to.eq("6.0");
  });

  it("updates", async function () {
    const params = {
      from: "5.0",
      to: "7.0",
      bundleId: bundleId,
    };

    const stub = new Stub({
      fixture: "ota_freeze_periods/update.json",
      uri: `teams/${teamId}/projects/${projectId}/bundle-freezes/${freezeId}`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      method: "PUT",
      body: params,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const freeze = await lokaliseApiOta
      .otaFreezePeriods()
      .update(freezeId, params, {
        teamId: teamId,
        lokaliseProjectId: projectId,
      });

    expect(freeze.to).to.eq("7.0");
  });

  it("deletes", async function () {
    const stub = new Stub({
      fixture: "ota_freeze_periods/delete.json",
      uri: `teams/${teamId}/projects/${projectId}/bundle-freezes/${freezeId}`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      method: "DELETE",
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const resp = await lokaliseApiOta.otaFreezePeriods().delete(freezeId, {
      teamId: teamId,
      lokaliseProjectId: projectId,
    });

    expect(resp.deleted).to.be.true;
    expect(resp.id).to.eq(freezeId);
  });
});
