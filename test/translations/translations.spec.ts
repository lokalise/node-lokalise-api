import { LokaliseApi, Stub, expect, it, describe } from "../setup.js";

describe("Translations", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const translationId = 304581208;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "translations/list.json",
      uri: `projects/${projectId}/translations`,
      respHeaders: {
        "x-pagination-total-count": "2",
        "x-pagination-page": "1",
        "x-pagination-limit": "500",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const translations = await lokaliseApi.translations().list({
      project_id: projectId,
    });

    expect(translations.items[0].translation_id).to.eq(translationId);
    expect(translations.nextCursor).to.be.null;
    expect(translations.hasNextCursor()).to.be.false;
  });

  it("lists and paginates", async function () {
    const params = {
      page: 2,
      limit: 2,
      filter_is_reviewed: 0,
    };

    const stub = new Stub({
      fixture: "translations/list_pagination.json",
      uri: `projects/${projectId}/translations`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "4",
        "x-pagination-page": "2",
        "x-pagination-limit": "2",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const translations = await lokaliseApi.translations().list({
      project_id: projectId,
      ...params,
    });

    expect(translations.items[0].translation_id).to.eq(304581213);
    expect(translations.totalResults).to.eq(4);
    expect(translations.totalPages).to.eq(2);
    expect(translations.resultsPerPage).to.eq(2);
    expect(translations.currentPage).to.eq(2);
    expect(translations.nextCursor).to.be.null;
    expect(translations.hasNextCursor()).to.be.false;
  });

  it("lists and paginates by cursor", async function () {
    const params = {
      pagination: <const>"cursor",
    };

    const stub = new Stub({
      fixture: "translations/list_cursor_pagination.json",
      uri: `projects/${projectId}/translations`,
      query: params,
      respHeaders: {
        "x-pagination-limit": "100",
        "x-pagination-next-cursor": "eyIxIjo1MjcyNjU2MTF9",
      },
    });

    await stub.setStub();

    const translations = await lokaliseApi.translations().list({
      project_id: projectId,
      ...params,
    });

    expect(translations.items[0].translation_id).to.eq(304581213);
    expect(translations.totalResults).to.eq(0);
    expect(translations.totalPages).to.eq(0);
    expect(translations.resultsPerPage).to.eq(100);
    expect(translations.currentPage).to.eq(0);
    expect(translations.nextCursor).to.eq("eyIxIjo1MjcyNjU2MTF9");
    expect(translations.hasNextCursor()).to.be.true;
  });

  it("lists and paginates by cursor with next cursor set", async function () {
    const params = {
      pagination: <const>"cursor",
      cursor: "eyIxIjo1MjcyNjU2MTF9",
      limit: 2,
    };

    const stub = new Stub({
      fixture: "translations/list_cursor_pagination.json",
      uri: `projects/${projectId}/translations`,
      query: params,
      respHeaders: {
        "x-pagination-limit": "2",
        "x-pagination-next-cursor": "eyIxIjo1MjcyNjU2MTd9",
      },
    });

    await stub.setStub();

    const translations = await lokaliseApi.translations().list({
      project_id: projectId,
      ...params,
    });

    expect(translations.items[0].translation_id).to.eq(304581213);
    expect(translations.totalResults).to.eq(0);
    expect(translations.totalPages).to.eq(0);
    expect(translations.resultsPerPage).to.eq(2);
    expect(translations.currentPage).to.eq(0);
    expect(translations.nextCursor).to.eq("eyIxIjo1MjcyNjU2MTd9");
    expect(translations.hasNextCursor()).to.be.true;
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "translations/retrieve.json",
      uri: `projects/${projectId}/translations/${translationId}`,
    });

    await stub.setStub();

    const translation = await lokaliseApi.translations().get(translationId, {
      project_id: projectId,
    });

    expect(translation.translation_id).to.eq(translationId);
    expect(translation.key_id).to.eq(44596059);
    expect(translation.language_iso).to.eq("en");
    expect(translation.translation).to.eq("Message");
    expect(translation.modified_by).to.eq(20181);
    expect(translation.modified_by_email).to.eq("bodrovis@protonmail.com");
    expect(translation.modified_at).to.eq("2020-05-11 11:20:33 (Etc/UTC)");
    expect(translation.modified_at_timestamp).to.eq(1589196033);
    expect(translation.is_reviewed).to.be.false;
    expect(translation.reviewed_by).to.eq(0);
    expect(translation.is_unverified).to.be.false;
    expect(translation.is_fuzzy).to.be.false;
    expect(translation.words).to.eq(1);
    expect(translation.custom_translation_statuses).to.have.lengthOf(0);
    expect(translation.task_id).to.eq(null);
  });

  it("updates", async function () {
    const params = { translation: "test" };

    const stub = new Stub({
      fixture: "translations/update.json",
      uri: `projects/${projectId}/translations/${translationId}`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const translation = await lokaliseApi
      .translations()
      .update(translationId, params, {
        project_id: projectId,
      });

    expect(translation.translation_id).to.eq(translationId);
    expect(translation.translation).to.eq("test");
  });
});
