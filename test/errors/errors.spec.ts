import { ApiError, ProjectWithPagination } from "../../src/main.js";
import { LokaliseApi, Stub, expect } from "../setup.js";

describe("Branches", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });

  it("handles exceptions", async function () {
    const fakeProjectId = "803";

    const stub = new Stub({
      uri: `projects/${fakeProjectId}/branches`,
      doFail: true,
    });

    await stub.setStub();

    await lokaliseApi
      .branches()
      .list({
        project_id: fakeProjectId,
      })
      .catch((e: ApiError) => {
        expect(e.message).to.include("failed");
      });
  });

  it("handles plain errors", async function () {
    const fakeProjectId = "803";

    const stub = new Stub({
      fixture: "errors/error_plain.json",
      uri: `projects/${fakeProjectId}/branches`,
      status: 401,
    });

    await stub.setStub();

    await lokaliseApi
      .branches()
      .list({ project_id: fakeProjectId })
      .catch((e: ApiError) => {
        expect(e.message).to.eq("Auth error");
        expect(e.code).to.eq(401);
      });
  });

  it("handles params-related errors", async function () {
    const params = <ProjectWithPagination>{};

    await lokaliseApi
      .branches()
      .list(params)
      .catch((e: Error) => {
        expect(e.message).to.eq("Missing required param: project_id");
      });
  });

  it("handles error 500", async function () {
    const fakeProjectId = "803";
    const params = {
      name: "hotfix/really-important",
    };

    const stub = new Stub({
      fixture: "errors/error_500.json",
      uri: `projects/${fakeProjectId}/branches`,
      status: 500,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    await lokaliseApi
      .branches()
      .create(params, { project_id: fakeProjectId })
      .catch((e: ApiError) => {
        expect(e.message).to.eq("Something very bad has happened");
        expect(e.code).to.eq(500);
      });
  });
});
