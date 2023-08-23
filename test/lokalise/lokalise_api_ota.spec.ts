import "../setup.js";
import { expect } from "chai";
import { LokaliseApiOta } from "../../src/main.js";

describe("LokaliseApiOta", function () {
  const token = "fake";

  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApiOta({ apiKey: "" });
    }).to.throw(Error);
  });

  it("is expected to contain clientData", function () {
    const client = new LokaliseApiOta({ apiKey: token });
    expect(client.clientData.token).to.eq(token);
    expect(client.clientData.tokenType).to.eq("Bearer");
    expect(client.clientData.authHeader).to.eq("Authorization");
    expect(client.clientData.enableCompression).to.be.false;
    expect(client.clientData.host).to.eq("https://ota.lokalise.com/v3");
  });

  it("allows to customize tokenType", function () {
    const client = new LokaliseApiOta({
      apiKey: token,
      tokenType: "Custom",
    });
    expect(client.clientData.tokenType).to.eq("Custom");
  });
});
