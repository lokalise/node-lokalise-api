import { expect, it, describe, LokaliseOtaBundles, Stub } from "../setup.js";

describe("OtaBundles", function () {
  const token = process.env.SDK_TOKEN;
  const lokaliseOtaBundles = new LokaliseOtaBundles({
    apiKey: token,
  });
  const rootUrl = lokaliseOtaBundles.clientData.host;
  const projectId = "88628569645b945648b474.25982965";
  const framework = "ios_sdk";

  it("retrieves", async function () {
    const params = {
      appVersion: "1.2.3",
      transVersion: 1,
    };

    const stub = new Stub({
      fixture: "ota_bundles/retrieve.json",
      uri: `lokalise/projects/${projectId}/frameworks/${framework}`,
      version: "v3",
      skipApiToken: true,
      rootUrl,
      query: params,
      reqHeaders: {
        "x-ota-api-token": token,
      },
    });

    await stub.setStub();

    const bundle = await lokaliseOtaBundles.otaBundles().get(params, {
      framework,
      lokaliseProjectId: projectId,
    });

    expect(bundle.url).to.include("ota-bundles.lokalise.com");
    expect(bundle.version).to.eq(682463);
  });
});
