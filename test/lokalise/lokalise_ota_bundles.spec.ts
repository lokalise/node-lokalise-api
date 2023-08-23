import "../setup.js";
import { expect } from "chai";
import { LokaliseOtaBundles } from "../../src/main.js";

describe("LokaliseOtaBundles", function () {
  const token = "fake";

  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseOtaBundles({ apiKey: "" });
    }).to.throw(Error);
  });

  it("is expected to contain clientData", function () {
    const client = new LokaliseOtaBundles({ apiKey: token });

    expect(client.clientData.token).to.eq(token);
    expect(client.clientData.tokenType).to.eq("");
    expect(client.clientData.authHeader).to.eq("x-ota-api-token");
    expect(client.clientData.enableCompression).to.be.false;
    expect(client.clientData.host).to.eq("https://ota.lokalise.com/v3");
  });
});
