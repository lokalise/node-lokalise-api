import { ProjectLanguageVantage as ProjectLanguage } from "../../../src/models/vantage/project_language.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Project languages", () => {
	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";

	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("lists", async () => {
		const stub = new Stub({
			fixture: "vantage/project_languages/list.json",
			uri: `projects/${project_id}/languages`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const languages = await lokaliseVantageApi.projectLanguages().list({ project_id });

		expect(languages).toHaveLength(2);

		const [english, french] = languages;

		expect(english).toBeInstanceOf(ProjectLanguage);
		expect(english).toMatchObject({
			languageId: "019d29d9-de52-7ba2-87c6-b5355ebf9c72",
			locale: "en",
			languageName: "English",
			isRtl: false,
		});

		expect(french).toBeInstanceOf(ProjectLanguage);
		expect(french).toMatchObject({
			languageId: "019d29d9-de52-7ba2-87c6-b5355efd2aa7",
			locale: "fr",
			languageName: "French",
			isRtl: false,
		});
	});
});
