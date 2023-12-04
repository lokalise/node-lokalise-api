import { expect, it, describe, LokaliseApiOAuth, Stub } from "../setup.js";

const token = process.env.OAUTH2_ACCESS_TOKEN;
const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApiOAuth", function () {
  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApiOAuth({ apiKey: "" });
    }).to.throw(Error);
  });

  it("is expected to contain clientData", function () {
    const client = new LokaliseApiOAuth({ apiKey: token });
    expect(client.clientData.token).to.eq(token);
    expect(client.clientData.tokenType).to.eq("Bearer");
    expect(client.clientData.authHeader).to.eq("Authorization");
    expect(client.clientData.enableCompression).to.be.false;
    expect(client.clientData.version).to.eq("api2");
  });

  it("allows to customize tokenType", function () {
    const client = new LokaliseApiOAuth({
      apiKey: token,
      tokenType: "Custom",
    });
    expect(client.clientData.tokenType).to.eq("Custom");
  });

  it("allows to fetch data with OAuth 2 token", async function () {
    const stub = new Stub({
      fixture: "lokalise/project_oauth2.json",
      uri: `projects/${project_id}`,
      skipApiToken: true,
      reqHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await stub.setStub();

    const client = new LokaliseApiOAuth({ apiKey: token });
    const project = await client.projects().get(project_id);

    expect(project.project_id).to.equal(project_id);
    expect(project.project_type).to.equal("localization_files");
  });
});
