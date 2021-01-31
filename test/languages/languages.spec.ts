require("../setup");
import { expect } from "chai";
import { Cassettes } from "mocha-cassettes";
import { LokaliseApi } from "../../src/lokalise/lokalise";

describe("Languages", function () {
  const cassette = new Cassettes("./test/cassettes");
  const lokaliseApi = new LokaliseApi({ apiKey: process.env.API_KEY });
  const project_id = "803826145ba90b42d5d860.46800099";
  const lang_id = 601;
  const second_lang_id = 910;

  cassette
    .createTest("list", async () => {
      const languages = await lokaliseApi.languages.list({
        project_id: project_id,
      });

      expect(languages.items[0].lang_id).to.eq(803);
      expect(languages.items[0].lang_name).to.eq("Albanian");
    })
    .register(this);

  cassette
    .createTest("list_pagination", async () => {
      const languages = await lokaliseApi.languages.list({
        project_id: project_id,
        page: 2,
        limit: 4,
      });

      expect(languages.items[0].lang_id).to.eq(lang_id);
      expect(languages.items[0].lang_name).to.eq("Chinese Traditional");
      expect(languages.totalResults).to.eq(12);
      expect(languages.totalPages).to.eq(3);
      expect(languages.resultsPerPage).to.eq(4);
      expect(languages.currentPage).to.eq(2);
    })
    .register(this);

  cassette
    .createTest("system_languages", async () => {
      const languages = await lokaliseApi.languages.system_languages({
        page: 3,
        limit: 2,
      });

      expect(languages.items[0].lang_id).to.eq(792);
      expect(languages.items[0].lang_name).to.eq("Afrikaans (South Africa)");
      expect(languages.totalResults).to.eq(619);
      expect(languages.totalPages).to.eq(310);
      expect(languages.resultsPerPage).to.eq(2);
      expect(languages.currentPage).to.eq(3);
    })
    .register(this);

  cassette
    .createTest("get", async () => {
      const language = await lokaliseApi.languages.get(lang_id, {
        project_id: project_id,
      });

      expect(language.lang_id).to.eq(lang_id);
      expect(language.lang_name).to.eq("Chinese Traditional");
      expect(language.lang_iso).to.eq("zh_TW");
      expect(language.is_rtl).to.be.false;
      expect(language.plural_forms).to.include("other");
    })
    .register(this);

  cassette
    .createTest("create", async () => {
      const languages = await lokaliseApi.languages.create(
        [
          {
            lang_iso: "ak",
          },
        ],
        { project_id: project_id }
      );

      expect(languages.items[0].lang_id).to.eq(second_lang_id);
      expect(languages.items[0].lang_name).to.eq("Akan");
      expect(languages.errors.length).to.eq(0);
    })
    .register(this);

  cassette
    .createTest("update", async () => {
      const language = await lokaliseApi.languages.update(
        lang_id,
        {
          lang_name: "Chinese Traditional Custom",
        },
        { project_id: project_id }
      );

      expect(language.lang_id).to.eq(lang_id);
      expect(language.lang_name).to.eq("Chinese Traditional Custom");
    })
    .register(this);

  cassette
    .createTest("delete", async () => {
      const response = await lokaliseApi.languages.delete(second_lang_id, {
        project_id: project_id,
      });
      expect(response.project_id).to.eq(project_id);
      expect(response.language_deleted).to.be.true;
    })
    .register(this);
});
