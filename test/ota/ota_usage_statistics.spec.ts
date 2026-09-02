import { getArrayItem } from "../helpers/collection.js";
import { getRequiredEnv } from "../helpers/get_env.js";
import { describe, expect, it, LokaliseApiOta, Stub } from "../setup.js";

describe("OtaUsageStatistics", () => {
	const token = getRequiredEnv("API_JWT");
	const lokaliseApiOta = new LokaliseApiOta({ apiKey: token });
	const rootUrl = lokaliseApiOta.clientData.host as string;
	const teamId = 176692;
	const projectId = "88628569645b945648b474.25982965";

	it("retrieves", async () => {
		const from = "2023-06-01";
		const to = "2023-08-23";
		const params = {
			dateFrom: from,
			dateTo: to,
		};

		const stub = new Stub({
			fixture: "ota_usage_statistics/retrieve.json",
			uri: `teams/${teamId}/projects/${projectId}/stats`,
			version: "v3",
			skipApiToken: true,
			rootUrl,
			query: params,
			reqHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		await stub.setStub();

		const stat = await lokaliseApiOta.otaUsageStatistics().get(params, {
			teamId: teamId,
			lokaliseProjectId: projectId,
		});

		expect(stat.lokaliseProjectId).to.eq(projectId);
		expect(stat.from).to.eq(from);
		expect(stat.to).to.eq(to);
		expect(stat.sdk).to.eq("");

		const monthlyStat = getArrayItem(stat.monthly);
		expect(monthlyStat.date).to.eq("2023-08-31");
		expect(monthlyStat.downloads).to.eq(2);

		const dailyStat = getArrayItem(stat.daily);
		expect(dailyStat.date).to.eq("2023-08-22");
		expect(dailyStat.trafficMb).to.eq(0);
		expect(stat.totals.trafficBytes).to.eq("3588");
	});
});
