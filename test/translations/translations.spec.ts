require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise_api";

describe("Translations", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const translation_id = 79607647;

  cassette
    .createTest("list", async () => {
      const translations = await lokaliseApi.translations().list({
        project_id: project_id,
      });

      expect(translations.items[0].translation_id).to.eq(translation_id);
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const translations = await lokaliseApi.translations().list({
        project_id: project_id,
        page: 2,
        limit: 1,
      });

      expect(translations.items[0].translation_id).to.eq(80015148);
      expect(translations.totalResults).to.eq(240);
      expect(translations.totalPages).to.eq(240);
      expect(translations.resultsPerPage).to.eq(1);
      expect(translations.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("list with opts", async () => {
      const translations = await lokaliseApi.translations().list({
        project_id: project_id,
        filter_is_reviewed: 0,
        filter_lang_id: 803,
      });

      expect(translations.items[0].translation_id).to.eq(304581213);
      expect(translations.items[0].language_iso).to.eq("sq");
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const translation = await lokaliseApi.translations().get(304581218, {
        project_id: project_id,
      });

      expect(translation.translation_id).to.eq(304581218);
      expect(translation.key_id).to.eq(44596059);
      expect(translation.language_iso).to.eq("ru");
      expect(translation.translation).to.eq("Сообщение");
      expect(translation.modified_by).to.eq(20181);
      expect(translation.modified_by_email).to.eq("bodrovis@protonmail.com");
      expect(translation.modified_at).to.eq("2020-05-15 10:44:42 (Etc/UTC)");
      expect(translation.modified_at_timestamp).to.eq(1589539482);
      expect(translation.is_reviewed).to.be.false;
      expect(translation.reviewed_by).to.eq(0);
      expect(translation.is_unverified).to.be.false;
      expect(translation.words).to.eq(1);
      expect(translation.custom_translation_statuses).to.have.lengthOf(0);
      expect(translation.task_id).to.eq(null);
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const translation = await lokaliseApi
        .translations()
        .update(
          translation_id,
          { translation: "тест" },
          { project_id: project_id }
        );

      expect(translation.translation_id).to.eq(translation_id);
      expect(translation.translation).to.eq("тест");
    })
    .register(this);
});
