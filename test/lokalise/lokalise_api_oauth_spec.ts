require("../setup");
import { expect } from "chai";
//import { Cassettes } from "mocha-cassettes";
import { LokaliseApiOAuth } from "../../src/lokalise/lokalise_api_oauth";

// const cassette = new Cassettes("./test/cassettes");
// const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApiOAuth", function () {
  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApiOAuth({ apiKey: "" });
    }).to.throw(Error);
  });

  it("is expected to contain clientData", function () {
    const client = new LokaliseApiOAuth({ apiKey: process.env.API_KEY });
    expect(client.clientData.token).to.eq(process.env.API_KEY);
    expect(client.clientData.tokenType).to.eq("Bearer");
    expect(client.clientData.authHeader).to.eq("Authorization");
    expect(client.clientData.enableCompression).to.be.false;
  });

  it("allows to customize tokenType", function () {
    const client = new LokaliseApiOAuth({
      apiKey: process.env.API_KEY,
      tokenType: "Custom",
    });
    expect(client.clientData.tokenType).to.eq("Custom");
  });
});
