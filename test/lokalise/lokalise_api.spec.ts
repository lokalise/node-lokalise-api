import { LokaliseApi, expect, it, describe, Stub } from "../setup.js";
import { MockAgent, setGlobalDispatcher } from "undici";

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

  it("is expected to reject with proper http message and status code if json is not parsable", async function () {
    const mockAgent = new MockAgent();
    setGlobalDispatcher(mockAgent);
    const mockPool = mockAgent.get("https://api.lokalise.com");

    mockPool
      .intercept({
        path: "/api2/projects/" + project_id,
        method: "GET",
      })
      .reply(429, <string>"Too many requests");

    const client = new LokaliseApi({ apiKey: process.env.API_KEY });

    try {
      expect(await client.projects().get(project_id)).to.throw();
    } catch (error) {
      expect(error).to.deep.equal({ message: "Too Many Requests", code: 429 });
    }
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
