import { TranslationStatusVantage as TranslationStatus } from "../../../src/models/vantage/translation_status.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, expect, it, LokaliseApiVantage, Stub } from "../../setup.js";

describe("Translation statuses", () => {
	const lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	const project_id = "019d29d9-de47-7a57-ac2d-53194197d213";
	const import_id = "01a15477-19e4-4d14-f5d5-481e8ea3dee5";

	it("gets translation status", async () => {
		const stub = new Stub({
			fixture: "vantage/translation_statuses/get.json",
			uri: `projects/${project_id}/translation-statuses/${import_id}`,
			version: "vantage/v1",
		});

		await stub.setStub();

		const result = await lokaliseVantageApi
			.translationStatuses()
			.get({ project_id, import_id });

		expect(result).toBeInstanceOf(TranslationStatus);
		expect(result.projectId).toBe(project_id);
		expect(result.importId).toBe(import_id);
		expect(result.status).toBe("PENDING_REVIEW");

		expect(result.languages).toHaveLength(1);
		expect(result.languages[0]).toEqual({
			languageId: "019d29d9-de52-7ba2-87c6-b5355efd2aa7",
			locale: "fr",
			status: "PENDING_REVIEW",
		});
	});
});
