import { LokaliseApi, Stub, expect } from "../setup.js";

describe("Jwt", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";

  it("creates", async function () {
    const stub = new Stub({
      fixture: "jwt/create.json",
      uri: `projects/${projectId}/tokens`,
      method: "POST",
    });

    await stub.setStub();

    const response = await lokaliseApi.jwt().create(projectId);

    expect(response.jwt).to.eq("eyJ0eXfake");
  });

  it("creates with service", async function () {
    const params = { service: "ota" };

    const stub = new Stub({
      fixture: "jwt/create.json",
      uri: `projects/${projectId}/tokens`,
      method: "POST",
      body: params,
    });

    await stub.setStub();

    const response = await lokaliseApi.jwt().create(projectId, params);

    expect(response.jwt).to.eq("eyJ0eXfake");
  });
});
