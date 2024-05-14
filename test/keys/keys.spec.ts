import { LokaliseApi, Stub, expect, it, describe } from "../setup.js";
import {
  CreateKeyParams,
  GetKeyParams,
  UpdateKeyData,
  BulkUpdateKeyParams,
} from "../../src/main.js";

describe("Keys", function () {
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const projectId = "803826145ba90b42d5d860.46800099";
  const keyId = 74189435;
  const secondKeyId = 74166139;

  it("lists", async function () {
    const stub = new Stub({
      fixture: "keys/list.json",
      uri: `projects/${projectId}/keys`,
      respHeaders: {
        "x-pagination-total-count": "2",
        "x-pagination-page": "1",
        "x-pagination-limit": "100",
        "x-pagination-page-count": "1",
      },
    });

    await stub.setStub();

    const params = { project_id: projectId };

    const keys = await lokaliseApi.keys().list(params);

    expect(keys.items[0].key_id).to.eq(15519786);
    expect(keys.nextCursor).to.be.null;
    expect(keys.hasNextCursor()).to.be.false;
  });

  it("lists and paginates", async function () {
    const params = {
      limit: 1,
      page: 2,
    };

    const stub = new Stub({
      fixture: "keys/list_pagination.json",
      uri: `projects/${projectId}/keys`,
      query: params,
      respHeaders: {
        "x-pagination-total-count": "2",
        "x-pagination-page": "2",
        "x-pagination-limit": "1",
        "x-pagination-page-count": "2",
      },
    });

    await stub.setStub();

    const keys = await lokaliseApi.keys().list({
      project_id: projectId,
      ...params,
    });

    expect(keys.items[0].key_id).to.eq(15571975);
    expect(keys.totalResults).to.eq(2);
    expect(keys.totalPages).to.eq(2);
    expect(keys.resultsPerPage).to.eq(1);
    expect(keys.currentPage).to.eq(2);
    expect(keys.nextCursor).to.be.null;
    expect(keys.hasNextCursor()).to.be.false;
  });

  it("lists and paginates by cursor", async function () {
    const params = {
      limit: 2,
      pagination: <const>"cursor",
    };

    const stub = new Stub({
      fixture: "keys/list_cursor_pagination.json",
      uri: `projects/${projectId}/keys`,
      query: params,
      respHeaders: {
        "x-pagination-limit": "2",
        "x-pagination-next-cursor": "eyIxIjo0NDU5NjA2MX0=",
      },
    });

    await stub.setStub();

    const keys = await lokaliseApi.keys().list({
      project_id: projectId,
      ...params,
    });

    expect(keys.items[0].key_id).to.eq(15519786);
    expect(keys.totalResults).to.eq(0);
    expect(keys.totalPages).to.eq(0);
    expect(keys.resultsPerPage).to.eq(2);
    expect(keys.currentPage).to.eq(0);
    expect(keys.nextCursor).to.eq("eyIxIjo0NDU5NjA2MX0=");
    expect(keys.hasNextCursor()).to.be.true;
  });

  it("lists and paginates by cursor with next cursor set", async function () {
    const params = {
      limit: 2,
      pagination: <const>"cursor",
      cursor: "eyIxIjo0NDU5NjA2MX0=",
    };

    const stub = new Stub({
      fixture: "keys/list_next_cursor_pagination.json",
      uri: `projects/${projectId}/keys`,
      query: params,
      respHeaders: {
        "x-pagination-limit": "2",
        "x-pagination-next-cursor": "eyIxIjo0NDU5NjA2M30=",
      },
    });

    await stub.setStub();

    const keys = await lokaliseApi.keys().list({
      project_id: projectId,
      ...params,
    });

    expect(keys.items[0].key_id).to.eq(15571975);
    expect(keys.totalResults).to.eq(0);
    expect(keys.totalPages).to.eq(0);
    expect(keys.resultsPerPage).to.eq(2);
    expect(keys.currentPage).to.eq(0);
    expect(keys.nextCursor).to.eq("eyIxIjo0NDU5NjA2M30=");
    expect(keys.hasNextCursor()).to.be.true;
  });

  it("retrieves", async function () {
    const stub = new Stub({
      fixture: "keys/retrieve.json",
      uri: `projects/${projectId}/keys/${keyId}`,
      query: { disable_references: 1 },
    });

    await stub.setStub();

    const params: GetKeyParams = {
      project_id: projectId,
      disable_references: 1,
    };

    const key = await lokaliseApi.keys().get(keyId, params);

    expect(key.key_id).to.eq(74189435);
    expect(key.created_at).to.eq("2021-01-29 17:34:16 (Etc/UTC)");
    expect(key.created_at_timestamp).to.eq(1611941656);
    expect(key.key_name.ios).to.eq("callback");
    expect(key.filenames.web).to.eq("");
    expect(key.description).to.eq("");
    expect(key.platforms).to.include("web");
    expect(key.tags).to.have.lengthOf(0);
    expect(key.comments[0].comment_id).to.eq(20421626);
    expect(key.screenshots).to.have.lengthOf(0);
    expect(key.translations[0].translation_id).to.eq(527556580);
    expect(key.is_plural).to.be.false;
    expect(key.plural_name).to.eq("");
    expect(key.is_hidden).to.be.false;
    expect(key.is_archived).to.be.false;
    expect(key.context).to.eq("");
    expect(key.base_words).to.eq(5);
    expect(key.char_limit).to.eq(0);
    expect(key.custom_attributes).to.eq("");
    expect(key.modified_at).to.eq("2023-09-19 13:26:15 (Etc/UTC)");
    expect(key.modified_at_timestamp).to.eq(1695129975);
    expect(key.translations_modified_at).to.eq("2021-07-27 10:42:09 (Etc/UTC)");
    expect(key.translations_modified_at_timestamp).to.eq(1627382529);
  });

  it("creates", async function () {
    const params: CreateKeyParams = {
      keys: [
        {
          key_name: "welcome_web_new",
          description: "Index app welcome",
          platforms: ["web"],
          filenames: {
            web: "my_filename.json",
          },
          translations: [
            {
              language_iso: "en",
              translation: "Welcome",
            },
          ],
        },
        {
          key_name: "welcome_ios_new",
          description: "Welcome apple",
          platforms: ["ios"],
          is_plural: true,
          translations: [
            {
              language_iso: "en",
              translation: {
                one: "I have one apple",
                other: "I have a lot of apples",
              },
            },
          ],
        },
      ],
    };

    const stub = new Stub({
      fixture: "keys/create.json",
      uri: `projects/${projectId}/keys`,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    const keys = await lokaliseApi
      .keys()
      .create(params, { project_id: projectId });

    expect(keys.items[0].key_name["web"]).to.eq("welcome_web_new");
    expect(keys.items[0].platforms).to.include("web");
    expect(keys.items[0].filenames["web"]).to.eq("my_filename.json");
    expect(keys.items[0].translations[0].translation).to.eq("Welcome");

    expect(keys.items[1].key_name["ios"]).to.eq("welcome_ios_new");
    expect(keys.items[1].platforms).to.include("ios");
    expect(keys.items[1].translations[0].language_iso).to.eq("en");
  });

  it("creates with errors", async function () {
    const params: CreateKeyParams = {
      keys: [
        {
          key_name: "welcome_web",
          description: "Index app welcome",
          platforms: ["web"],
          filenames: {
            web: "my_filename.json",
          },
          translations: [
            {
              language_iso: "en",
              translation: "Welcome",
            },
          ],
        },
        {
          key_name: "welcome_ios_supernew",
          description: "Welcome apple",
          platforms: ["ios"],
          is_plural: true,
          translations: [
            {
              language_iso: "en",
              translation: {
                one: "I have one apple",
                other: "I have a lot of apples",
              },
            },
          ],
        },
      ],
    };

    const stub = new Stub({
      fixture: "keys/create_errors.json",
      uri: `projects/${projectId}/keys`,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    const keys = await lokaliseApi
      .keys()
      .create(params, { project_id: projectId });

    expect(keys.items[0].key_name["ios"]).to.eq("welcome_ios_supernew");
    expect(keys.items[0].platforms).to.include("ios");
    expect(keys.items[0].translations[0].language_iso).to.eq("en");

    expect(keys.errors[0].message).to.eq("This key name is already taken");
    expect(keys.errors[0].key_name.ios).to.eq("welcome_web");
  });

  it("creates with per-platform names", async function () {
    const params: CreateKeyParams = {
      keys: [
        {
          key_name: {
            ios: "name_for_ios2",
            web: "name_for_web2",
            android: "android_name2",
            other: "other_name2",
          },
          platforms: ["web", "ios"],
          translations: [
            {
              language_iso: "en",
              translation: "Per-platform key names",
            },
          ],
        },
      ],
    };

    const stub = new Stub({
      fixture: "keys/create_per_platform.json",
      uri: `projects/${projectId}/keys`,
      body: params,
      method: "POST",
    });

    await stub.setStub();

    const keys = await lokaliseApi
      .keys()
      .create(params, { project_id: projectId });

    const key = keys.items[0];

    expect(key.key_name["web"]).to.eq("name_for_web2");
    expect(key.key_name["ios"]).to.eq("name_for_ios2");
    expect(key.platforms).to.include("web", "ios");
    expect(key.platforms).not.to.include("android", "other");
  });

  it("updates", async function () {
    const params: UpdateKeyData = {
      platforms: ["web", "other"],
      description: "Node updated",
    };

    const stub = new Stub({
      fixture: "keys/update.json",
      uri: `projects/${projectId}/keys/${keyId}`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const key = await lokaliseApi
      .keys()
      .update(keyId, params, { project_id: projectId });

    expect(key.key_id).to.eq(keyId);
    expect(key.platforms).to.include("web", "other");
    expect(key.description).to.eq("Node updated");
  });

  it("bulk updates", async function () {
    const params: BulkUpdateKeyParams = {
      keys: [
        {
          key_id: keyId,
          description: "Bulk node",
          platforms: ["web"],
        },
        {
          key_id: secondKeyId,
          description: "Second bulk",
        },
      ],
    };

    const stub = new Stub({
      fixture: "keys/update_bulk.json",
      uri: `projects/${projectId}/keys`,
      body: params,
      method: "PUT",
    });

    await stub.setStub();

    const keys = await lokaliseApi
      .keys()
      .bulk_update(params, { project_id: projectId });

    expect(keys.items[1].key_id).to.eq(keyId);
    expect(keys.items[1].description).to.eq("Bulk node");
    expect(keys.items[1].platforms).to.include("web");
    expect(keys.items[1].platforms).not.to.include("other");

    expect(keys.items[0].key_id).to.eq(secondKeyId);
    expect(keys.items[0].description).to.eq("Second bulk");

    expect(keys.errors.length).to.eq(0);
  });

  it("deletes", async function () {
    const deleteKeyId = 378219556;

    const stub = new Stub({
      fixture: "keys/delete.json",
      uri: `projects/${projectId}/keys/${deleteKeyId}`,
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.keys().delete(deleteKeyId, {
      project_id: projectId,
    });

    expect(response.project_id).to.eq(projectId);
    expect(response.key_removed).to.be.true;
    expect(response.keys_locked).to.eq(0);
    expect(response.branch).to.eq("master");
  });

  it("bulk deletes", async function () {
    const deleteKeyIds = [378219195, 378217832];

    const stub = new Stub({
      fixture: "keys/bulk_delete.json",
      uri: `projects/${projectId}/keys`,
      body: { keys: deleteKeyIds },
      method: "DELETE",
    });

    await stub.setStub();

    const response = await lokaliseApi.keys().bulk_delete(deleteKeyIds, {
      project_id: projectId,
    });

    expect(response.project_id).to.eq(projectId);
    expect(response.keys_removed).to.be.true;
    expect(response.keys_locked).to.eq(0);
    expect(response.branch).to.eq("master");
  });
});
