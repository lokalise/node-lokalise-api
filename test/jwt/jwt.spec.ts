import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi, Jwt } from "../../src/main.js";

describe("Jwt", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  cassette
    .createTest("get", async () => {
      const response: Jwt = await lokaliseApi.jwt().get();
      expect(response.jwt).to.include("eyJ0eXAiOiJKV1QiLCJhbG");
    })
    .register(this);
});
