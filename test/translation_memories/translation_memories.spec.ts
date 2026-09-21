import { getTestApiKey } from "../helpers/get_env.js";
import { describe, expect, it, LokaliseApi, Stub } from "../setup.js";

describe("Translation memories", () => {
	const lokaliseApi = new LokaliseApi({
		apiKey: getTestApiKey(),
	});
	const projectId = "7565202469c53c30428ce0.33693563";

	it("lists", async () => {
		const stub = new Stub({
			fixture: "translation_memories/list.json",
			uri: `projects/${projectId}/translation-memories`,
		});

		await stub.setStub();

		const tms = await lokaliseApi.translationMemories().list({
			project_id: projectId,
		});

		expect(tms[0]?.name).to.eq("Lokalise Translation Memory");
		expect(tms[1]?.id).to.eq(2592);
	});
});
