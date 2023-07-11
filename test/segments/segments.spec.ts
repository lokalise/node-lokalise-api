import "../setup.js";
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api.js";

describe("Segments", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "39066161618d4ecb9fdc12.00274309";
  const key_id = 134490810;
  const segment_number = 1;

  cassette
    .createTest("list", async () => {
      const segments = await lokaliseApi.segments().list({
        project_id: project_id,
        key_id: key_id,
        language_iso: "en",
        disable_references: 1,
        filter_unverified: 0,
      });

      expect(segments[0].language_iso).to.eq("en");
      expect(segments[2].value).to.eq("So good.");
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const segment = await lokaliseApi.segments().get(segment_number, {
        project_id: project_id,
        key_id: key_id,
        language_iso: "en",
      });

      expect(segment.segment_number).to.eq(segment_number);
      expect(segment.language_iso).to.eq("en");
      expect(segment.modified_at).to.eq("2021-12-16 16:19:04 (Etc/UTC)");
      expect(segment.modified_at_timestamp).to.eq(1639671544);
      expect(segment.modified_by).to.eq(20181);
      expect(segment.modified_by_email).to.eq("bodrovis@protonmail.com");
      expect(segment.value).to.eq("Hey!");
      expect(segment.is_fuzzy).to.eq(false);
      expect(segment.is_reviewed).to.eq(false);
      expect(segment.reviewed_by).to.eq(0);
      expect(segment.words).to.eq(1);
      expect(segment.custom_translation_statuses.length).to.eq(0);
    })
    .register(this);

  cassette
    .createTest("get with params", async () => {
      const segment = await lokaliseApi.segments().get(2, {
        project_id: project_id,
        key_id: key_id,
        language_iso: "en",
        disable_references: 0,
      });

      expect(segment.segment_number).to.eq(2);
      expect(segment.language_iso).to.eq("en");
      expect(segment.is_reviewed).to.eq(true);
      expect(segment.reviewed_by).to.eq(20181);
      expect(segment.custom_translation_statuses[0].title).to.eq("context");
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const segment = await lokaliseApi.segments().update(
        segment_number,
        {
          value: "Hello!",
          is_fuzzy: true,
        },
        { project_id: project_id, key_id: key_id, language_iso: "en" },
      );

      expect(segment.segment_number).to.eq(segment_number);
      expect(segment.is_fuzzy).to.eq(true);
      expect(segment.value).to.eq("Hello!");
    })
    .register(this);
});
