import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi, Jwt } from "../../src/main.js";

describe("Jwt", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "2273827860c1e2473eb195.11207948";

  cassette
    .createTest("create", async () => {
      const response: Jwt = await lokaliseApi.jwt().create(project_id);
      expect(response.jwt).to.include("eyJ0eXAiOiJK");
    })
    .register(this);
});
