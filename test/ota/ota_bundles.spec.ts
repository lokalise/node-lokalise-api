import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseOtaBundles } from "../../src/main.js";

describe("SdkTokens", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseOtaBundles = new LokaliseOtaBundles({
    apiKey: process.env.SDK_TOKEN,
  });
  const projectId = "963054665b7c313dd9b323.35886655";

  cassette
    .createTest("get", async () => {
      const bundle = await lokaliseOtaBundles.otaBundles().get(
        {
          appVersion: "1.2.3",
          transVersion: 1,
        },
        {
          framework: "ios_sdk",
          lokaliseProjectId: projectId,
        },
      );

      expect(bundle.url).to.include("ota-bundles.lokalise.com");
      expect(bundle.version).to.eq(664155);
    })
    .register(this);
});
