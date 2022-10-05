import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

const cassette = new Cassettes("./test/cassettes");
const project_id = "803826145ba90b42d5d860.46800099";

describe("LokaliseApi", function () {
  it("is expected to throw an error if the API key is not provided", function () {
    expect(function () {
      new LokaliseApi({ apiKey: "" });
    }).to.throw(Error);
  });

  it("is expected to contain clientData", function () {
    const client = new LokaliseApi({ apiKey: process.env.API_KEY });
    expect(client.clientData.token).to.eq(process.env.API_KEY);
    expect(client.clientData.authHeader).to.eq("x-api-token");
    expect(client.clientData.enableCompression).to.be.false;
  });
});

describe("LokaliseApi host", function () {
  it("is expected to have empty host by default", function () {
    const client = new LokaliseApi({ apiKey: process.env.API_KEY });
    expect(client.clientData.host).to.be.undefined;
  });

  it("is expected to assign host", function () {
    const client = new LokaliseApi({
      apiKey: process.env.API_KEY,
      host: "http://example.com",
    });
    expect(client.clientData.host).to.eq("http://example.com");
  });

  cassette
    .createTest("list_with_gzip", async () => {
      const client = new LokaliseApi({
        apiKey: process.env.API_KEY,
        host: "https://api.lokalise.com/api2/",
      });
      const keys = await client.keys().list({ project_id: project_id });
      expect(keys.items[0].key_id).to.eq(44596059);
    })
    .register(this);
});

describe("LokaliseApi gzip", function () {
  cassette
    .createTest("list_with_gzip", async () => {
      const client = new LokaliseApi({
        apiKey: process.env.API_KEY,
        enableCompression: true,
      });
      const keys = await client.keys().list({ project_id: project_id });
      expect(keys.items[0].key_id).to.eq(44596059);
    })
    .register(this);

  cassette
    .createTest("system_languages_no_gzip", async () => {
      const client = new LokaliseApi({
        apiKey: process.env.API_KEY,
        enableCompression: false,
      });

      const languages = await client.languages().system_languages({
        page: 3,
        limit: 1,
      });

      expect(languages.items[0].lang_id).to.eq(790);
    })
    .register(this);

  cassette
    .createTest("system_languages_default_gzip", async () => {
      const client = new LokaliseApi({ apiKey: process.env.API_KEY });

      const languages = await client.languages().system_languages({
        page: 4,
        limit: 1,
      });

      expect(languages.items[0].lang_id).to.eq(791);
    })
    .register(this);
});
