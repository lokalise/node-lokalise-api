import { LokaliseApi, expect, Stub } from "../setup.js";

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
    expect(client.clientData.version).to.eq("api2");
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
});

describe("LokaliseApi gzip", function () {
  it("decompresses", async function () {
    const stub = new Stub({
      fixture: "lokalise/contributors.json",
      query: { limit: 2 },
      uri: `projects/${project_id}/contributors`,
      reqHeaders: {
        "Accept-Encoding": "gzip,deflate",
      },
      respHeaders: {
        "x-pagination-total-count": "1",
        "x-pagination-page": "1",
        "x-pagination-limit": "2",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const client = new LokaliseApi({
      apiKey: process.env.API_KEY,
      enableCompression: true,
    });

    const contributors = await client
      .contributors()
      .list({ project_id: project_id, limit: 2 });

    expect(contributors.items[0].fullname).to.eq("Ilya B");
  });
});
