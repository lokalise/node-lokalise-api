import { expect } from "chai";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("LokaliseApi", function () {
  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApi({ apiKey: "" });
    }).to.throw(Error);
  });
});
