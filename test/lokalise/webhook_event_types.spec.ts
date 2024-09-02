import type {
	WebhookProjectImported,
	WebhookProjectLanguagesAdded,
} from "../../src/main.js";
import { describe, expect, it } from "../setup.js";

describe("Webhook event types", () => {
	it("should provide typings", () => {
		const event: WebhookProjectImported = {
			event: "project.imported",
			import: {
				filename: "en.json",
				format: "json",
				inserted: 231,
				updated: 0,
				skipped: 0,
			},
			project: {
				id: "138c1ffa0ad94848f01f980e7f2f2af19d1bd553",
				name: "TheApp Project",
			},
			user: {
				email: "jdoe@mycompany.com",
				full_name: "John Doe",
			},
			created_at: "2019-07-29 12:18:31",
			created_at_timestamp: 1564395511,
		};

		expect(event.import.filename).to.eq("en.json");

		const eventLangs: WebhookProjectLanguagesAdded = {
			event: "project.languages.added",
			languages: [
				{
					id: 734,
					iso: "it",
					name: "Italian",
				},
				{
					id: 123,
					iso: "fake",
					name: "Fake",
				},
			],
			project: {
				id: "138c1ffa0ad94848f01f980e7f2f2af19d1bd553",
				name: "TheApp Project",
			},
			user: {
				email: "jdoe@mycompany.com",
				full_name: "John Doe",
			},
			created_at: "2019-07-29 12:18:31",
			created_at_timestamp: 1564395511,
		};

		expect(eventLangs.languages[0].id).to.eq(734);
	});
});
