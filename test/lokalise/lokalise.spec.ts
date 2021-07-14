require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

const cassette = new Cassettes("./test/cassettes");
const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApi", function () {
  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApi({ apiKey: "" });
    }).to.throw(Error);
    new LokaliseApi({ apiKey: process.env.API_KEY });
  });
});

describe("LokaliseApi gzip", function () {
  cassette
    .createTest("list_with_gzip", async () => {
      new LokaliseApi({ apiKey: process.env.API_KEY, enableCompression: true });
      const keys = await lokaliseApi.keys.list({ project_id: project_id });
      expect(keys.items[0].key_id).to.eq(44596059);
      new LokaliseApi({
        apiKey: process.env.API_KEY,
        enableCompression: false,
      });
    })
    .register(this);

  cassette
    .createTest("system_languages_no_gzip", async () => {
      new LokaliseApi({
        apiKey: process.env.API_KEY,
        enableCompression: false,
      });

      const languages = await lokaliseApi.languages.system_languages({
        page: 3,
        limit: 1,
      });

      expect(languages.items[0].lang_id).to.eq(790);
    })
    .register(this);

  cassette
    .createTest("system_languages_default_gzip", async () => {
      new LokaliseApi({ apiKey: process.env.API_KEY });

      const languages = await lokaliseApi.languages.system_languages({
        page: 4,
        limit: 1,
      });

      expect(languages.items[0].lang_id).to.eq(791);
    })
    .register(this);
});
