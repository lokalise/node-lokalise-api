// import { AuditEventV1 } from "../../../src/models/v1/audit_event.js";
// import type { AuditLogParams } from "../../../src/types/v1/audit_logs.js";
// import { getCollectionItem } from "../../helpers/collection.js";
import { getTestApiKey } from "../../helpers/get_env.js";
import { describe, it, LokaliseApiVantage } from "../../setup.js";

describe("Project items", () => {
	const _lokaliseVantageApi = new LokaliseApiVantage({
		apiKey: getTestApiKey(),
	});

	it("works", async () => {
		console.log("TODO: pending");
		// console.log(await lokaliseVantageApi.projectItems().list({project_id: "019d29d9-de47-7a57-ac2d-53194197d213"}))
	});
});
